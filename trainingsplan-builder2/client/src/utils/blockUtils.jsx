export function createNewBlock(block, instanceId) {
    let newOptions = {};
    if (['aufwaermen', 'gehpause', 'trabpause', 'abkuehlung'].includes(block.id)) {
      newOptions = { 
        selectedUnit: "Distanz",
        value: '',
        unitOptions: ["Distanz", "Zeit"],
        notiz: ''
      };
    } else if (block.id === 'tempolauf') {
      newOptions = { 
        selectedDropdown: block.options.dropdown[0],
        selectedUnit: "Distanz",
        value: '',
        dropdown: block.options.dropdown,
        unitOptions: ["Distanz", "Zeit"],
        notiz: ''
      };
    } else if (block.id === 'dauerlauf') {
      newOptions = { 
        selectedDropdown: block.options.dropdown[0],
        selectedUnit: "Distanz",
        value: '',
        dropdown: block.options.dropdown,
        unitOptions: ["Distanz", "Zeit"],
        notiz: ''
      };
    } else if (block.id === 'wiederholung') {
      newOptions = { 
        repetitions: block.options.repetitions,
        notiz: ''
      };
    }
    return {
      ...block,
      instanceId,
      options: newOptions,
      ...(block.id === 'wiederholung' ? { children: [] } : {})
    };
  }
  
  export function addBlockToTree(blocks, parentId, newBlock) {
    if (parentId === null) {
      return [...blocks, newBlock];
    }
    return blocks.map(b => {
      if (b.instanceId === parentId && b.id === 'wiederholung') {
        return {
          ...b,
          children: [...(b.children || []), newBlock]
        };
      } else if (b.children) {
        return {
          ...b,
          children: addBlockToTree(b.children, parentId, newBlock)
        };
      }
      return b;
    });
  }
  
  export function deleteBlockFromTree(blocks, instanceId) {
    return blocks.filter(b => b.instanceId !== instanceId).map(b => {
      if (b.children) {
        return { ...b, children: deleteBlockFromTree(b.children, instanceId) };
      }
      return b;
    });
  }
  
  export function moveBlockInArray(arr, instanceId, direction) {
    const index = arr.findIndex(b => b.instanceId === instanceId);
    if (index === -1) return arr;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return arr;
    const newArr = [...arr];
    [newArr[index], newArr[newIndex]] = [newArr[newIndex], newArr[index]];
    return newArr;
  }
  
  export function moveBlockInTree(blocks, instanceId, direction) {
    const index = blocks.findIndex(b => b.instanceId === instanceId);
    if (index !== -1) {
      return moveBlockInArray(blocks, instanceId, direction);
    }
    return blocks.map(b => {
      if (b.children) {
        return { ...b, children: moveBlockInTree(b.children, instanceId, direction) };
      }
      return b;
    });
  }
  
  export function updateBlockOptionsInTree(blocks, instanceId, newOptions) {
    return blocks.map(b => {
      if (b.instanceId === instanceId) {
        return { ...b, options: { ...b.options, ...newOptions } };
      }
      if (b.children) {
        return { ...b, children: updateBlockOptionsInTree(b.children, instanceId, newOptions) };
      }
      return b;
    });
  }
  
  export function computeSums(blocks) {
    let distance = 0, time = 0;
    blocks.forEach(block => {
      if (block.id === 'wiederholung') {
        const reps = block.options.repetitions || 1;
        const childSums = computeSums(block.children || []);
        distance += childSums.distance * reps;
        time += childSums.time * reps;
      } else {
        const val = parseFloat(block.options.value) || 0;
        if (block.options.selectedUnit === "Distanz") {
          distance += val;
        } else if (block.options.selectedUnit === "Zeit") {
          time += val;
        }
      }
    });
    return { distance, time };
  }