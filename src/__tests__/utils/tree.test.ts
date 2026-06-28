/**
 * tree.ts 单元测试
 *
 * 覆盖 5 个核心树操作函数。
 * 树结构是级联选择器、菜单、组织架构等组件的基础。
 * 重点验证：
 *   - 树 ↔ 数组的双向转换（getTreeMap / arrayToTree）
 *   - 节点查找（getNodePath 路径 / exactMatchTree 精确匹配）
 *   - 过滤保留完整路径（filterTree）
 *   - 空输入安全（[] / null / undefined 不抛异常）
 */
import { describe, expect, it } from 'vitest';
import {
  arrayToTree,
  exactMatchTree,
  filterTree,
  getNodePath,
  getTreeMap,
} from '../../utils/tree';

describe('tree — 树结构操作工具', () => {
  // ─── getTreeMap ──────────────────────────────────────────────
  // 嵌套树 → 平铺数组（深度优先遍历）
  // hasChild: 是否保留 children 字段（默认 true）
  describe('getTreeMap — 嵌套树平铺为数组', () => {
    const tree = [
      {
        id: 1,
        name: 'root',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2', children: [{ id: 4, name: 'grandchild' }] },
        ],
      },
    ];

    it('三层嵌套树 → 4 个节点平铺（深度优先遍历顺序）', () => {
      const result = getTreeMap({ tree });
      expect(result).toHaveLength(4);
      // 顺序：root → child1 → child2 → grandchild
      expect(result.map((n: any) => n.id)).toEqual([1, 2, 3, 4]);
    });

    it('空数组 → []（安全返回，不抛异常）', () => {
      expect(getTreeMap({ tree: [] })).toEqual([]);
    });

    it('hasChild=false → 顶层节点去除 children 字段', () => {
      // 已知：hasChild 不递归传递，仅影响顶层
      const result = getTreeMap({ tree, hasChild: false });
      const rootNode = result.find((n: any) => n.id === 1);
      expect(rootNode.children).toBeUndefined();
    });

    it('children 键名可自定义（如 "sub"）', () => {
      const customTree = [{ id: 1, sub: [{ id: 2 }] }];
      const result = getTreeMap({ tree: customTree, children: 'sub' });
      expect(result).toHaveLength(2);
    });
  });

  // ─── arrayToTree ─────────────────────────────────────────────
  // 平铺数组 → 嵌套树。非递归算法，O(n)。
  // 节点通过 nodeKey/parentKey 建立父子关系
  describe('arrayToTree — 平铺数组还原为嵌套树', () => {
    const flat = [
      { id: 1, parentId: 0, name: 'root' },
      { id: 2, parentId: 1, name: 'child1' },
      { id: 3, parentId: 1, name: 'child2' },
      { id: 4, parentId: 2, name: 'grandchild' },
    ];

    it('4 个平铺节点 → 1 个根节点 + 2 个子节点 + 1 个孙节点', () => {
      const result = arrayToTree({ tree: flat });
      expect(result).toHaveLength(1); // 只有 root 顶层
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(2); // child1 + child2
      expect(result[0].children[0].children).toHaveLength(1); // grandchild
    });

    it('空数组 → []（安全返回）', () => {
      expect(arrayToTree({ tree: [] })).toEqual([]);
    });

    it('自定义 nodeKey="uid" parentKey="pid" → 正确建立父子关系', () => {
      const customFlat = [
        { uid: 'a', pid: null, name: 'root' },
        { uid: 'b', pid: 'a', name: 'child' },
      ];
      const result = arrayToTree({
        tree: customFlat,
        nodeKey: 'uid',
        parentKey: 'pid',
      });
      expect(result).toHaveLength(1);
      expect(result[0].children).toHaveLength(1);
    });
  });

  // ─── getNodePath ─────────────────────────────────────────────
  // 从根到目标节点的 nodeKey 路径（含头含尾）
  describe('getNodePath — 查找节点在树中的路径', () => {
    const tree = [{ id: 1, children: [{ id: 2, children: [{ id: 3 }] }] }];

    it('深度 3 节点 → [1, 2, 3]（完整路径）', () => {
      expect(getNodePath({ tree, key: 3 })).toEqual([1, 2, 3]);
    });

    it('根节点 → [1]（单元素路径）', () => {
      expect(getNodePath({ tree, key: 1 })).toEqual([1]);
    });

    it('不存在的 key → []', () => {
      expect(getNodePath({ tree, key: 99 })).toEqual([]);
    });

    it('空树 → []', () => {
      expect(getNodePath({ tree: [], key: 1 })).toEqual([]);
    });
  });

  // ─── filterTree ──────────────────────────────────────────────
  // 按条件过滤，但保留匹配节点的完整祖先路径
  // 典型场景：菜单搜索 — 搜到子菜单也要显示父级
  describe('filterTree — 过滤树节点（保留完整路径）', () => {
    const tree = [
      {
        id: 1,
        name: 'root',
        children: [
          { id: 2, name: 'child-a' },
          { id: 3, name: 'child-b', children: [{ id: 4, name: 'grand-a' }] },
        ],
      },
    ];

    it('按 name 包含 "a" 过滤 → 保留 root + child-a + child-b(因 grand-a) + grand-a', () => {
      const result = filterTree({
        tree,
        filterFn: (node: any) => node.name?.includes('a'),
      });
      expect(result).toHaveLength(1);
      const root = result![0] as any;
      expect(root.id).toBe(1);
      // child-a 自己匹配，child-b 因为 grand-a 匹配而被保留
      expect(root.children).toHaveLength(2);
    });

    it('tree 为 null → 返回 null（安全处理）', () => {
      expect(filterTree({ tree: null, filterFn: () => true })).toBeNull();
    });

    it('非数组 tree 自动包装为数组处理', () => {
      const result = filterTree({
        tree: { id: 1, name: 'match' },
        filterFn: () => true,
      });
      expect(result).toHaveLength(1);
    });
  });

  // ─── exactMatchTree ──────────────────────────────────────────
  // 精确匹配：按 valueKey（默认 'name'）查找第一个 value 相等的节点
  describe('exactMatchTree — 精确匹配树节点（findNodeByKey）', () => {
    const tree = [
      { id: 1, name: 'root', children: [{ id: 2, name: 'child' }] },
    ];

    it("value='child' → 返回 { id:2, name:'child' }", () => {
      const result = exactMatchTree({ tree, value: 'child' });
      expect(result).toBeTruthy();
      expect((result as any).id).toBe(2);
    });

    it('不存在的 value → null', () => {
      expect(exactMatchTree({ tree, value: 'nonexistent' })).toBeNull();
    });

    it('空树 → null', () => {
      expect(exactMatchTree({ tree: [], value: 'x' })).toBeNull();
    });
  });
});
