function handleInput(e) {
  const key = e.currentTarget.dataset.key;
  // 处理对象
  const obj = e.currentTarget.dataset.obj;
  const text = e.currentTarget.dataset.text;
  // 处理数组结果
  const index = e.currentTarget.dataset.index;
  const result = e.currentTarget.dataset.result;
  if (obj) {
    this.setData({
      [text]: Object.assign(this.data[obj], { [key]: e.detail.value || '' })
    });
  } else if (index > -1) {
    const copyData = [...result];
    copyData[index][key] = e.detail.value || '';
    this.setData({
      [text]: copyData
    });
  } else {
    this.setData({
      [key]: e.detail.value || ''
    });
  }
}

function hanldSelectChange(e) {
  var range = e.currentTarget.dataset['range'];
  var keyText = e.currentTarget.dataset['key'];
  var field = e.currentTarget.dataset['field'];

  // 处理对象
  const obj = e.currentTarget.dataset.obj;
  const text = e.currentTarget.dataset.text;
  // 处理数组结果
  const index = e.currentTarget.dataset.index;
  const result = e.currentTarget.dataset.result;

  if (obj) {
    this.setData({
      [text]: Object.assign(this.data[obj], {
        [keyText]: field ? this.data[range][e.detail.value][field] : this.data[range][e.detail.value]
      })
    });
  } else if (index > -1) {
    // 先不动field了
    const copyData = [...result];
    copyData[index][keyText] = this.data[range][e.detail.value];
    this.setData({
      [text]: copyData
    });
  } else {
    this.setData({
      [keyText]: field ? this.data[range][e.detail.value][field] : this.data[range][e.detail.value]
    });
  }
}

function multiSelect(selected = [], current = '') {
  if (!selected) {
    selected = [];
  }
  var index = selected.indexOf(current);
  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(current);
  }
  return { selected: selected };
}

function handleMultiSelectChange(e, allOptions, allOptionStr) {
  const v = e.currentTarget.dataset.value.value;
  const key = e.currentTarget.dataset.key;
  const obj = e.currentTarget.dataset.obj;
  const copyData = [...allOptions];
  const selected = [];
  for (let type of copyData) {
    if (type.value === v) {
      type.selected = !type.selected;
    }
    if (type.selected) {
      selected.push(type.value);
    }
  }
  if (!obj) {
    this.setData({
      [allOptionStr]: copyData,
      [key]: selected
    });
  } else {
    this.setData({
      [allOptionStr]: copyData,
      [obj]: Object.assign(this.data[obj], {
        [key]: selected
      })
    });
  }
}

function handleCheckboxChange(e, allOptions, allOptionStr, preHandler = false) {
  const checkedList = e.detail.value;
  const key = e.currentTarget.dataset.key;
  const obj = e.currentTarget.dataset.obj;
  const copyData = [...allOptions];
  const last = copyData[copyData.length - 1];
  const current = checkedList.length && checkedList[checkedList.length-1] || '';
  // 如果选中了最后一项，则把其他选项都取消
  if (preHandler) {
    if (current == last.value) {
      for (let i = 0; i < copyData.length; i++) {
        // 把其他选项都取消选中
        if (i !== copyData.length - 1) {
          copyData[i].selected = false;
        } else {
          copyData[i].selected = true;
        }
      }
    } else {
      // 如果选中了其他选项，则把最后一项取消
      for (let i = 0; i < copyData.length; i++) {
        if (
          checkedList.includes(copyData[i].value) &&
          i !== copyData.length - 1
        ) {
          copyData[i].selected = true;
        } else {
          copyData[i].selected = false;
        }
      }
    }
  } else {
    for (let type of copyData) {
      if (checkedList.includes(type.value)) {
        type.selected = true;
      } else {
        type.selected = false;
      }
    }
  }
  const checked = copyData.filter(item => item.selected == true).map(item => item.value);
  if (!obj) {
    this.setData({
      [allOptionStr]: copyData,
      [key]: checked
    });
  } else {
    this.setData({
      [allOptionStr]: copyData,
      [obj]: Object.assign(this.data[obj], {
        [key]: checked
      })
    });
  }
}

function initMultiOptions(allOptions, selected) {
  let handledAllOptions = [];
  for (let option of allOptions) {
    if (selected.indexOf(option) > -1) {
      handledAllOptions.push({
        value: option,
        selected: true
      });
    } else {
      handledAllOptions.push({
        value: option,
        selected: false
      });
    }
  }
  return { handledAllOptions };
}
module.exports = {
  handleInput,
  hanldSelectChange,
  multiSelect,
  initMultiOptions,
  handleMultiSelectChange,
  handleCheckboxChange
};
