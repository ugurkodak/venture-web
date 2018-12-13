// //TODO: Lots will have positions
// //TODO: Lots will be able to have merged
// //TODO: Lot values will depend on population demand
// export class City {
//     private _database: firebase.database.Reference;
//     private _id: string | null = null;
//     private _lots: City.Lot[] | null = null;
//     get lots(): City.Lot[] {
//         if (this._lots != null) return this._lots;
//         else {
//             console.error('Uninitialized lots data.');
//             return [];
//         }
//     }

//     constructor(databaseRootReference: firebase.database.Reference) {
//         this._database = databaseRootReference;
//     }

//     public async create() {
//         let lots: City.Lot[] = [];
//         for (let i = 0; i < City.LOT_COUNT; i++) {
//             lots[i] = {
//                 number: i,
//                 value: City.LOT_MAX_VALUE * (1 - i / 100),
//                 characterId: null
//             }
//         }
//         this._lots = lots;
//     }
// }

// export namespace City {
//     export const LOT_COUNT = 100;
//     export const LOT_MAX_VALUE = 500000;

//     export interface Data {
//         lots: Lot[];
//     }

//     export interface Lot {
//         number: number,
//         value: number,
//         characterId: string | null
//     }
// }