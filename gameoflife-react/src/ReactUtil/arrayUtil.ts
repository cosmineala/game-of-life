/**
* Removes object from array, fo not use with primitives.
* @param array The array containing the onject.
* @param element The object that needs to be removed.
* @returns Booleam, True if element was found, false if not.
*/
export default function arrRemObj(array: any[], element: any): boolean {

    let index = array.indexOf(element);

    if (index === -1) return false;

    array.splice(index, 1);
    return true;
}