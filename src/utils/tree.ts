import isArray from 'lodash/isArray';
import omit from 'lodash/omit';

interface TreeNode {
  [key: string | number]: unknown | TreeNode[];
}

export type getTreeMapProps = {
  tree: any[];
  children?: string;
  hasChild?: boolean;
};

/**
 * @description 将树平铺为数组
 * @param { object } tree 数据
 * @param { String } children 树形结构关联的属性
 */
function getTreeMap({
  tree,
  children = 'children',
  hasChild = true,
}: getTreeMapProps): any[] {
  if (!Array.isArray(tree)) return [];

  let result: any[] = [];

  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];

    let localNode = node;

    if (!hasChild) {
      localNode = omit({ ...localNode }, [children]);
    }

    result.push(localNode);

    if (node[children] && node[children].length) {
      result = result.concat(
        getTreeMap({
          tree: node[children],
          children: children,
        }),
      );
    }
  }

  return result;
}

interface ArrayToTreeProps {
  tree: any[];
  nodeKey?: string;
  parentKey?: string;
  children?: string;
}

/**
 * @description 将数组变成tree非递归
 * @param {*} arr
 * @param {*} nodeKey 节点标识
 * @param {*} parentKey 父节点标识
 * @param {*} children 子节点属性
 * @returns
 */
function arrayToTree({
  tree,
  nodeKey = 'id',
  parentKey = 'parentId',
  children = 'children',
}: ArrayToTreeProps) {
  const result: any[] = [];

  if (!Array.isArray(tree) || tree.length === 0) {
    return result;
  }

  const map: { [key: string | number]: TreeNode } = {};

  tree.forEach((item) => (map[item[nodeKey] as string | number] = item));
  tree.forEach((item) => {
    const parent = map[item[parentKey] as string | number];

    if (parent) {
      ((parent[children] || (parent[children] = [])) as TreeNode[]).push(item);
      return;
    }

    result.push(item);
  });
  return result;
}

export interface GetNodePathProps {
  tree: any[];
  key: string | number;
  nodeKey?: string;
  children?: string;
  resultKey?: string;
}
/**
 * @description 查找节点在树中的路径
 * @param {*} tree 树的数据
 * @param {*} id 查找的id
 * @param {*} nodeKey 节点标识符
 * @param {*} children 子节点标识
 * @returns
 */
const getNodePath = ({
  tree,
  key,
  nodeKey = 'id',
  children = 'children',
}: GetNodePathProps): any[] => {
  if (!Array.isArray(tree) || tree.length === 0) return [];

  const path: (string | number)[] = [];

  const treeFindPath = (
    tree: TreeNode[],
    id: string | number,
    path: (string | number)[],
  ): (string | number)[] => {
    for (const item of tree) {
      path.push(item[nodeKey] as string | number);

      if (item[nodeKey] === id) return path;

      if (item?.[children]) {
        const findChildren = treeFindPath(
          item[children] as TreeNode[],
          id,
          path,
        );

        if (findChildren.length) {
          return findChildren;
        }
      }

      path.pop();
    }

    return [];
  };

  return treeFindPath(tree, key, path);
};

export interface FuzzyQueryTreeProps {
  tree: any[];
  value: any;
  valueKey: string;
  children?: string;
}

/**
 * @description 模糊匹配树
 * @param {*} arr 树数据
 * @param {*} value  匹配的数据
 * @param {*} nameKey 查询的属性
 * @param {*} children 子节点属性
 * @returns
 */
const fuzzyQueryTree = ({
  tree,
  value,
  valueKey = 'name',
  children = 'children',
}: FuzzyQueryTreeProps): any[] => {
  let newArr: any[] = [];

  tree.forEach((element) => {
    if (element[valueKey]?.indexOf(value) > -1) {
      newArr.push(element);
      return;
    }

    if (element[children] && element[children]?.length > 0) {
      const reqData = fuzzyQueryTree({
        tree: element[children],
        value,
        valueKey,
        children,
      });

      if (reqData && reqData.length > 0) {
        newArr = newArr.concat([...reqData]);
      }
    }
  });

  return newArr;
};

export interface ExactMatchTreeProps {
  tree: any[];
  value: any;
  valueKey?: string;
  children?: string;
}
/**
 * @description 精确匹配树
 * @param {*} tree 树数据
 * @param {*} value  匹配的数据
 * @param {*} nameKey 查询的属性
 * @param {*} children 子节点属性
 */
function exactMatchTree({
  tree,
  value,
  valueKey = 'name',
  children = 'children',
}: ExactMatchTreeProps): TreeNode | null {
  if (!Array.isArray(tree) || tree.length === 0) {
    return null;
  }

  for (const data of tree) {
    if (data?.[valueKey] === value) return data;

    if (data?.[children]) {
      const result = exactMatchTree({
        tree: data[children],
        value,
        valueKey,
        children,
      });

      if (result) return result;
    }
  }

  return null;
}

export interface TraverseTreeNodesProps {
  tree: any[];
  callback: (node: any) => void;
  children?: string;
}
/**
 * @description 对树节点的属性进行操作
 * @param {Array} tree 树节点数据
 * @param { Function } callBack 回调函数
 * @param { string } children 子节点
 * @returns
 */
const traverseTreeNodes = ({
  tree,
  callback,
  children = 'children',
}: TraverseTreeNodesProps) => {
  tree.forEach((item) => {
    callback(item);

    if (item[children] && item[children]?.length > 0) {
      traverseTreeNodes({
        tree: item[children],
        callback,
        children,
      });
    }
  });

  return tree;
};

export interface FilterTreeProps {
  tree: any;
  filterFn: (node: any) => boolean;
  children?: string;
}

/**
 * @description 筛选树并返回新树
 * @param tree
 * @param filterFn
 * @param children
 * @returns
 */
export function filterTree<T>({
  tree,
  filterFn,
  children = 'children',
}: FilterTreeProps) {
  let stashTree = tree;

  if (!tree) return null;

  if (!isArray(tree)) stashTree = [tree];

  return stashTree.reduce((acc: T[], node: any) => {
    const newNode = { ...node };

    const childrenList = filterTree({
      tree: (newNode as any)[children] || [],
      filterFn,
    });

    if (filterFn(newNode) || childrenList?.length) {
      (newNode as any)[children] = childrenList;

      acc.push(newNode as any);
    }

    return acc;
  }, []);
}

/**
 * @description 递归遍历树
 * @param {Array} tree 树节点数据
 * @param { Function } callBack 回调函数
 * @param { string } children 子节点
 * @returns
 */
const traversalTree = (
  tree: any[],
  callback: (node: any) => void,
  children = 'children',
) => {
  tree.forEach((item: any) => {
    callback(item);

    if (item[children]?.length > 0) {
      traversalTree(item[children], callback, children);
    }
  });

  return tree;
};

/**
 * @description 删除树的空节点
 * @param {*} tree 数据
 * @param {*} children children = children
 * @returns
 */
function removeEmptyTreeNode(tree: any, children = 'children') {
  tree.forEach((item: any) => {
    if (item[children]?.length === 0 || !item[children]?.length) {
      delete item[children];
      return;
    }

    if ((item[children] as TreeNode[])?.length > 0) {
      removeEmptyTreeNode(item[children] as any[], children);
    }
  });

  return tree;
}

/**
 * @description 获取所有的叶子节点
 * @param {*} tree
 * @param {*} children
 * @returns
 */
const getTreeLeaf = (tree: TreeNode[], children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  const result: TreeNode[] = [];
  const getLeaf = (tree: TreeNode[]) => {
    tree.forEach((item: TreeNode) => {
      if (!(item[children] as TreeNode[])?.length) {
        result.push(item);
        return;
      }

      if ((item[children] as TreeNode[])?.length > 0) {
        getLeaf(item[children] as TreeNode[]);
      }
    });
  };

  getLeaf(tree);
  return result;
};

export {
  getTreeMap,
  getNodePath,
  fuzzyQueryTree,
  traverseTreeNodes,
  removeEmptyTreeNode,
  getTreeLeaf,
  arrayToTree,
  traversalTree,
  exactMatchTree,
};
