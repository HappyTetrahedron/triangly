var triangles = [];
var images = []

const maxWidthSm = 500;
const maxWidthMd = 1000;
var numCols = getColumnCountForWidth(window.innerWidth);

function reshuffleInitial() {
    for (let child of document.getElementById("col-0").children) {
        triangles.push(child);
    }
    reshuffle();
}

function reshuffle() {
    numCols = getColumnCountForWidth(window.innerWidth);
    cols = [];
    for(var i = 0; i < numCols; i = i + 1) {
        cols.push({
            node: document.getElementById(`col-${i}`),
            slant: i % 2 === 0 ? 'right' : 'left',
            height: 0,
        });
    }

    for (let column of cols) {
        while(column.node.firstChild) {
            column.node.removeChild(column.node.firstChild);
        }
    }

    for (let tri of triangles) {
        triangleHeight = tri.classList.contains('trapezoid') ? 3 : 1;
        triangleSlant = tri.classList.contains('triangle-left') || tri.classList.contains('trapezoid-left') ? 'left' : 'right';

        bestCol = cols
            .filter(col => col.slant !== triangleSlant)
            .sort((colA, colB) => colA.height - colB.height)
            [0];
        bestCol.node.appendChild(tri);
        bestCol.height = bestCol.height + triangleHeight;
        bestCol.slant = triangleSlant;

    }
}

function checkResize() {
    var width = window.innerWidth;
    if (getColumnCountForWidth(width) != numCols) {
        reshuffle();
    }
}

function getColumnCountForWidth(width) {
    var newColumns = width < maxWidthSm ? 1 : 
        width < maxWidthMd ? 2 :
        3;
    return newColumns;
}

window.onresize = checkResize;
