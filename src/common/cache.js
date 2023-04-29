import storage from 'good-storage'

const HISTORY = '__history__'


// 新增一条记录
export function addHistory(item) {
    const list = getHistory(HISTORY)

    // 数组不存在的话创建一个数组
    if (!list) return storage.set(HISTORY, [item]);

    const index = list.findIndex(ele => item.id === ele.id)

    if (index != -1) list.splice(index, 1);

    list.unshift(item);

    storage.set(HISTORY, list)
}

// 删除一条记录
export function delHistory(index) {
    const list = getHistory(HISTORY)

    list.splice(index, 1);

    storage.set(HISTORY, list)
}

// 清除所有
export function clearHistory() {
    storage.set(HISTORY, []);
}

// 获取所有记录
export function getHistory() {
    return storage.get(HISTORY);
}
