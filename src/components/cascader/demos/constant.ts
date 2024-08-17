export const MockTree = [
  {
    id: 'root',
    value: 'rootValue',
    label: 'Root Node',
    children: [
      {
        id: 'child1',
        value: 'child1Value',
        label: 'Child Node 1',
        children: [
          {
            id: 'grandchild1',
            value: 'grandchild1Value',
            label: 'Grandchild Node 1',
            children: [
              {
                id: 'greatgrandchild1',
                value: 'greatgrandchild1Value',
                label: 'Great-grandchild Node 1',
                children: [],
              },
              {
                id: 'greatgrandchild2',
                value: 'greatgrandchild2Value',
                label: 'Great-grandchild Node 2',
                children: [],
              },
            ],
          },
          {
            id: 'grandchild2',
            value: 'grandchild2Value',
            label: 'Grandchild Node 2',
            children: [
              {
                id: 'greatgrandchild3',
                value: 'greatgrandchild3Value',
                label: 'Great-grandchild Node 3',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'child2',
        value: 'child2Value',
        label: 'Child Node 2',
        children: [
          {
            id: 'grandchild3',
            value: 'grandchild3Value',
            label: 'Grandchild Node 3',
            children: [],
          },
          {
            id: 'grandchild4',
            value: 'grandchild4Value',
            label: 'Grandchild Node 4',
            children: [
              {
                id: 'greatgrandchild4',
                value: 'greatgrandchild4Value',
                label: 'Great-grandchild Node 4',
                children: [
                  {
                    id: 'greatgreatgrandchild1',
                    value: 'greatgreatgrandchild1Value',
                    label: 'Great-great-grandchild Node 1',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'child3',
        value: 'child3Value',
        label: 'Child Node 3',
        children: [],
      },
    ],
  },
];
