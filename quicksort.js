async function partition(p, r) {

    await sleep(delay);
    let pivot = arr[p];
    setColor(p, SELECTED);
    let i = p + 1;
    let j = r;

    while(true){
        while(i <= j && arr[i] <= pivot){
            setColor(i,LEFT)
            await sleep(delay);
            i++;
        }

        while(j >= i && arr[j] >= pivot){
            setColor(j,RIGHT)
            await sleep(delay);
            j--;
        }

        if(i >= j){
            break;
        }else{
            await sleep(delay);
            swap(i,j);
            await sleep(delay);
        }
    }
    await sleep(delay);
    swap(p, j);
    setColor(p,UNSORTED);
    setColorRange(p, r, UNSORTED);
    return j;
}

async function quicksort(p, r) {
    if(p < r) {
        var q = await partition(p, r);

        await quicksort(p, q - 1);

        setColorRange(p, q, SORTED);
        await quicksort(q + 1, r);

        setColorRange(q + 1, r, SORTED);
    }

    if(p == 0 && r == size - 1)
        await sleep(delay);
}
