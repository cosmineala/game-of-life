/**
* Removes object from array, fo not use with primitives.
* @param array The array containing the onject.
* @param element The object that needs to be removed.
* @returns Booleam, True if element was found, false if not.
*/
export function arrRemObj( array: any[], element: any): any {

    let index = array.indexOf(element);

    if (index === -1) return undefined;

    return array.splice(index, 1)[0];
    
}

export function arrPutBeforObj( array: any[], elementBot: any, elementTop: any ): boolean{

    if( arrRemObj( array, elementBot ) === undefined ) return false;

    let indexTop = array.indexOf( elementTop) ;
    if (indexTop === -1) return false;

    array.splice( indexTop , 0, elementTop);
    return true;
}