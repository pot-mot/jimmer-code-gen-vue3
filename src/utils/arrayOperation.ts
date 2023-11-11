export const  swapItems = <T> (array: T[], index1: number, index2: number) => {
    if (index1 >= array.length || index2 >= array.length || index1  < 0 || index2 < 0) {
        console.error("array index out of bounds")
        return
    }

    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}