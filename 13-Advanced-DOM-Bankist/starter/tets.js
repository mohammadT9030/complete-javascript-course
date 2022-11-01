'use strict';

function determinant(m) {
  // return the determinant of the matrix passed in
  if (m.length === 1) return m[0][0];
  if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  return m.reduce(
    (acc, _, i) =>
      (acc +=
        (-1) ** i *
        m[0][i] *
        determinant(
          m.slice(1).map(row => {
            const rowCopy = row.slice();
            rowCopy.splice(i, 1);
            return rowCopy;
          })
        )),
    0
  );
}

console.log(
  determinant([
    [2, 4, 2],
    [3, 1, 1],
    [1, 2, 0],
  ])
);
