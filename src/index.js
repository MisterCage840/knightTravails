const node = (position, parent = null) => {
  const distance = parent ? parent.distance + 1 : 0;
  const isVisited = false;

  const getPosition = () => position;
  const getParent = () => parent;
  const getVisitStatus = () => isVisited;
  const getDistance = () => distance;

  return { getPosition, getParent, getDistance, getVisitStatus };
};

const getKnightMoves = ([x, y]) => {
  const moves = [
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
  ];

  return moves.filter(
    ([newX, newY]) => newX >= 0 && newX < 8 && newY >= 0 && newY < 8,
  );
};

const BFS = (start, end) => {
  const queue = [];

  let startNode = node(start);

  queue.push(startNode);

  while (queue.length > 0) {
    let cur = queue.shift();
    let curPos = cur.getPosition();

    if (curPos[0] == end[0] && curPos[1] == end[1]) {
      let path = [];
      let node = cur;
      while (node) {
        path.push(node.getPosition());
        node = cur.getParent();
      }
      return path;
    } else {
      let possibleMoves = getKnightMoves(cur.getPosition());
      for (let move of possibleMoves) {
        let enqueueNode = node(move, cur);
        if (!enqueueNode.getVisitStatus()) {
          queue.push(enqueueNode);
        }
      }
    }
  }
  return null;
};

console.log(BFS([0, 0], [3, 3]));
