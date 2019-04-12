//changed the hardcoded value 400, to width and height of the canvas :)
var grid;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(10);
  grid.randomize();
}

function draw () {
  background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
  grid.draw();
}

function mousePressed(){
  // grid.randomize();
  var randomColumn = floor(random(grid.numberOfColumns));
  var randomRow = floor(random(grid.numberOfRows));
  
  var randomCell = grid.cells[randomColumn][randomRow];
  var neighborCount = grid.getNeighbors(randomCell).length;
  
  print("cell at " + randomCell.column + ", " + randomCell.row + " has " + neighborCount + " neighbors");
  print(grid.isValidPosition(0, 0)); // should be true
  print(grid.isValidPosition(-1, -1)); // should be false
  // Add an example for all of the possible ways that it should return false
  print(grid.isValidPosition(0,1));
  
  // grid.updateNeighborCounts();
  // grid.updatePopulation();
  print(grid.cells);

}

class Grid {
  constructor (cellSize) {
    this.cellSize = cellSize;
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.numberOfColumns = width/cellSize; 
    //changed the hardcoded value 400 to width and height
    this.numberOfRows = height/cellSize;
    var cells;
    this.cells = new Array(this.numberOfColumns);
    for (var i = 0; i < this.numberOfColumns; i ++) {
      this.cells[i] = new Array(this.numberOfRows);
    }
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize);
      }
    }
    print(this.cells);
  }

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.draw()
      }
    }
  }
  randomize(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.setIsAlive(floor(random(2)));
      }
    }
  }
  updatePopulation(){
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        cell.liveOrDie();
      }
    }
  }
  getNeighbors(currentCell) {
  var neighbors = [];

  // add logic to get neighbors and add them to the array
  for (var xOffset = -1; xOffset <= 1; xOffset++) {
    for (var yOffset = -1; yOffset <= 1; yOffset++) {
      var neighborColumn = currentCell.column + xOffset;
      var neighborRow = currentCell.row + yOffset;
      if(this.isValidPosition(neighborColumn, neighborRow) && this.cells[neighborColumn][neighborRow] != this.cells[currentCell.column][currentCell.row]){
        neighbors.push(this.cells[neighborColumn][neighborRow]);
      }

    // do something with neighborColumn and neighborRow
    }
  }

  return neighbors;
  }
  isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
      if(column < this.numberOfColumns && column >= 0 && row < this.numberOfRows && row >= 0){
        return true;
      }
      else{
        return false;
      }
  // return true if they are valid and false if they are not
  }
  updateNeighborCounts(){
    // for each cell in the grid
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
    // reset it's neighbor count to 0
        cell.liveNeighborCount = 0;
    // get the cell's neighbors
       var n = this.getNeighbors(cell);
       cell.neighborCount = n.length;
    // increase liveNeighborCount by 1 for each neighbor that is alive
        for(var i = 0; i < n.length; i++){
          if(n[i].isAlive){
            cell.liveNeighborCount++;
          }
        }
      }
    }
  }
}
class Cell {
  constructor(column, row, size) {
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = false;
    this.liveNeighborCount = 0;
  }
  draw() {
    if(this.isAlive === true) {
      fill(0, 255, 0);
    }
    else if(this.isAlive === false){
      fill(255, 0, 0);
    }
    noStroke();
    rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }
  setIsAlive(value){
    if(value){
      this.isAlive = true;
    }
    else {
      this.isAlive = false;
    }
  }
  liveOrDie(){
    if (this.isAlive){
      if (this.liveNeighborCount == 2 || this.liveNeighborCount == 3){
        this.isAlive = true;
      }
      else {
        this.isAlive = false;
      }
    }
    if (!this.isAlive) {
      if(this.liveNeighborCount === 3){
        this.isAlive = true;
      }
      else{
        this.isAlive = false;
      }
    }
  }
}
