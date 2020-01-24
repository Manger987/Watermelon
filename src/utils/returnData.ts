import labels from './labels.json';
import { ResultStandard } from '../Clases';

export async function registerEnds(code: number, dataReturn: any) : Promise<ResultStandard> {
    let retorna = new ResultStandard;

    retorna.code = code;
    retorna.data = dataReturn;
    switch (code) {
        case 500: { 
            retorna.statusMessage = dataReturn.message;
            break; 
        }
        case 200: {
            retorna.statusMessage = labels.Status[200];
            break; 
        }
        case 204: {
            retorna.statusMessage = labels.Status[204];
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