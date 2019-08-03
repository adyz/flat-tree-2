export type NewRandomData = {
    id: string;
    name: string;
    expanded: boolean;
    children: NewRandomData[];
  };
  
const data: NewRandomData[] = [
  {
    id: '0-0',
    name: 'test 0-0',
    expanded: false,
    children: [
      {
        id: '0-0-0',
        name: 'test 0-0-0',
        expanded: true,
        children: []
      },
      {
        id: '0-0-1',
        name: 'test 0-0-1',
        expanded: true,
        children: []
      },
      {
        id: '0-0-2',
        name: 'test 0-0-2',
        expanded: false,
        children: [
          {
            id: '0-0-2-0',
            name: 'test 0-0-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-0-2-1',
            name: 'test 0-0-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-0-2-2',
            name: 'test 0-0-2-2',
            expanded: false,
            children: [
              {
                id: '0-0-2-2-0',
                name: 'test 0-0-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-0-2-2-1',
                name: 'test 0-0-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-0-2-2-2',
                name: 'test 0-0-2-2-2',
                expanded: true,
                children: [
                  {
                    id: '0-0-2-2-2-0',
                    name: 'test 0-0-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-0-2-2-2-1',
                    name: 'test 0-0-2-2-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-0-2-2-2-2',
                    name: 'test 0-0-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '0-1',
    name: 'test 0-1',
    expanded: false,
    children: [
      {
        id: '0-1-0',
        name: 'test 0-1-0',
        expanded: true,
        children: []
      },
      {
        id: '0-1-1',
        name: 'test 0-1-1',
        expanded: true,
        children: []
      },
      {
        id: '0-1-2',
        name: 'test 0-1-2',
        expanded: false,
        children: [
          {
            id: '0-1-2-0',
            name: 'test 0-1-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-1-2-1',
            name: 'test 0-1-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-1-2-2',
            name: 'test 0-1-2-2',
            expanded: false,
            children: [
              {
                id: '0-1-2-2-0',
                name: 'test 0-1-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-1-2-2-1',
                name: 'test 0-1-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-1-2-2-2',
                name: 'test 0-1-2-2-2',
                expanded: false,
                children: [
                  {
                    id: '0-1-2-2-2-0',
                    name: 'test 0-1-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-1-2-2-1',
                    name: 'test 0-1-2-0-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-1-2-2-2',
                    name: 'test 0-1-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '0-2',
    name: 'test 0-2',
    expanded: false,
    children: [
      {
        id: '0-2-0',
        name: 'test 0-2-0',
        expanded: true,
        children: []
      },
      {
        id: '0-2-1',
        name: 'test 0-2-1',
        expanded: true,
        children: []
      },
      {
        id: '0-2-2',
        name: 'test 0-2-2',
        expanded: false,
        children: [
          {
            id: '0-2-2-0',
            name: 'test 0-2-2-0',
            expanded: true,
            children: []
          },
          {
            id: '0-2-2-1',
            name: 'test 0-2-2-1',
            expanded: true,
            children: []
          },
          {
            id: '0-2-2-2',
            name: 'test 0-2-2-2',
            expanded: false,
            children: [
              {
                id: '0-2-2-2-0',
                name: 'test 0-2-2-2-0',
                expanded: true,
                children: []
              },
              {
                id: '0-2-2-2-1',
                name: 'test 0-2-2-2-1',
                expanded: true,
                children: []
              },
              {
                id: '0-2-2-2-2',
                name: 'test 0-2-2-2-2',
                expanded: false,
                children: [
                  {
                    id: '0-2-2-2-2-0',
                    name: 'test 0-2-2-2-2-0',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-2-2-2-1',
                    name: 'test 0-2-2-0-2-1',
                    expanded: true,
                    children: []
                  },
                  {
                    id: '0-2-2-2-2',
                    name: 'test 0-2-2-2-2-2',
                    expanded: true,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export {
    data
};