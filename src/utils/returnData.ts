import labels from './labels.json';
import { ResultStandard } from '../Clases';

export async function registerEnds(status: any, dataReturn: any) : Promise<ResultStandard> {
    let retorna = new ResultStandard;

    retorna.status = status;
    retorna.data = dataReturn;
    switch (status) {
        case 500: { 
            retorna.statusMessage = labels.Status[500];
            break; 
        }
        case 200: {
            retorna.statusMessage = labels.Status[200];
            break; 
        }
        case 404: {
            retorna.statusMessage = labels.Status[404];
            break; 
        }
        default:{
            retorna.statusMessage = labels.Error.ErrorGrl;
            break;
        } 
    }
    return retorna;
}