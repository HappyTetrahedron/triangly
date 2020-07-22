/*
	Copyright 2020, Aline Abler

    This file is part of Triangly.

    Triangly is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Triangly is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Triangly.  If not, see <https://www.gnu.org/licenses/>.
*/


var triangles = [];
var images = [];

const maxWidthSm = 500;
const maxWidthMd = 1000;
var numCols = getColumnCountForWidth(window.innerWidth);

function reshuffleInitial() {
    [].slice.call(document.getElementById("col-0").children).forEach(function(child) {
        triangles.push(child);
    });
    reshuffle();
}

function reshuffle() {
    numCols = getColumnCountForWidth(window.innerWidth);
    cols = [];
    for(var i = 0; i < numCols; i = i + 1) {
        cols.push({
            node: document.getElementById('col-' + i),
            slant: i % 2 === 0 ? 'right' : 'left',
            height: 0,
        });
    }

    cols.forEach(function(column) {
        while(column.node.firstChild) {
            column.node.removeChild(column.node.firstChild);
        }
    });

    triangles.forEach(function(tri) {
        triangleHeight = tri.classList.contains('trapezoid') ? 3 : 1;
        triangleSlant = tri.classList.contains('triangle-left') || tri.classList.contains('trapezoid-left') ? 'left' : 'right';

        bestCol = cols
            .filter(function(col) { return col.slant !== triangleSlant; })
            .sort(function(colA, colB) { return colA.height - colB.height; })
            [0];
        bestCol.node.appendChild(tri);
        bestCol.height = bestCol.height + triangleHeight;
        bestCol.slant = triangleSlant;

    });
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
