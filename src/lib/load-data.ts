import fs from 'fs';
import path from 'path';

export async function getPdChartData(dateThreshold: string) {

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
