import fs from 'fs';
import path from 'path';

async function loadBasicData(dateThreshold: string) {

    const historicalFilePath = path.join(process.cwd(), 'public', 'data', 'Historical_PD.json'); 
    const historicalJsonData = await fs.promises.readFile(historicalFilePath, 'utf-8');
    const historicalData = JSON.parse(historicalJsonData);

    const processedHistoricalData = historicalData.Date.map((date: string, index: number) => ({
        date,
        "Historical PD": historicalData.Historical_PD[index],
    })).filter((data: { date: string; }) => data.date >= dateThreshold);

    const forwardFilePath = path.join(process.cwd(), 'public', 'data', 'Forward_PD.json');
    const forwardJsonData = await fs.promises.readFile(forwardFilePath, 'utf-8');
    const forwardData = JSON.parse(forwardJsonData);

    const processedForwardData = forwardData.Forward_Months.map((date: string, index: number) => ({
        date,
        "Forward PD": forwardData.Forward_PD[index],
    }));

    // TODO - Hacky: To ensure graph looks continuous, assign last Historical PD with Forward PD field
    if (processedHistoricalData.length > 0) {
        const lastHistoricalPD = processedHistoricalData[processedHistoricalData.length - 1]["Historical PD"];
        processedHistoricalData[processedHistoricalData.length - 1]["Forward PD"] = lastHistoricalPD
    }

    const pdDataset = [...processedHistoricalData, ...processedForwardData];
    return pdDataset;
}

async function loadStockData(dateThreshold: string) {
    const stockFilePath = path.join(process.cwd(), 'public', 'data', 'Stock_Price.json');
    const stockJsonData = await fs.promises.readFile(stockFilePath, 'utf-8');
    const stockData = JSON.parse(stockJsonData);

    const processedStockData = stockData.Date.map((date: string, index: number) => ({
        date,
        "Stock Price": stockData.Stock_Price[index],
    })).filter((data: { date: string; }) => data.date >= dateThreshold);

    return processedStockData;
}

async function loadDefaultData(dateThreshold: string) {
    const defaultFilePath = path.join(process.cwd(), 'public', 'data', 'Actual_Defaults.json');
    const defaultJsonData = await fs.promises.readFile(defaultFilePath, 'utf-8');
    const defaultData = JSON.parse(defaultJsonData);

    const processedDefaultData = defaultData.Date.map((date: string, index: number) => ({
        date,
        "Actual Default": defaultData.Actual_Default[index],
    })).filter((data: { date: string; }) => data.date >= dateThreshold);

    return processedDefaultData;
}

async function loadBondData() {
    const bondFilePath = path.join(process.cwd(), 'public', 'data', 'PDIR_Bonding.json');
    const bondJsonData = await fs.promises.readFile(bondFilePath, 'utf-8');
    const bondData = JSON.parse(bondJsonData);

    const processedBondData = bondData.rate.map((rate: string, index: number) => ({
        rate,
        "bonding": bondData.bonding[index],
    }));

    return processedBondData;
}

export async function loadData(dateThreshold: string) {
    const pdBasicDataset = await loadBasicData(dateThreshold);
    const stockDataset = await loadStockData(dateThreshold);
    const defaultDataset = await loadDefaultData(dateThreshold);
    const bondDataset = await loadBondData();
    const combinedDataMap: Record<string, { date: string; "Historical PD"?: number; "Forward PD"?: number; "Stock Price"?: number; "Actual Default"?: number; [key: string]: number | string | undefined }> = {};

    // Helper function to add entries to the combined map
    const addToCombinedMap = (data: { date: string; [key: string]: number | string }[], entryKeys: string[]) => {
        data.forEach(entry => {
            const date = entry.date;

            if (!combinedDataMap[date]) {
                combinedDataMap[date] = { date }; 
            }
            entryKeys.forEach(key => {
                if (entry[key] !== undefined) {
                    combinedDataMap[date][key] = entry[key];
                }
            });
        });
    };

    addToCombinedMap(pdBasicDataset, ["Historical PD", "Forward PD"]);
    addToCombinedMap(stockDataset, ["Stock Price"]);
    addToCombinedMap(defaultDataset, ["Actual Default"]);

    const combinedDataArray = Object.values(combinedDataMap);
    return [combinedDataArray, bondDataset];
}