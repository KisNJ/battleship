function itIncludesCoordinate(x, y,fromX,fromY) {
    
    temp=[
        {
            "x": 5,
            "y": 9,
            "size": 4,
            "rowOrcolumn": "row",
            "others": [
                {
                    "x": 6,
                    "y": 9
                },
                {
                    "x": 7,
                    "y": 9
                },
                {
                    "x": 8,
                    "y": 9
                }
            ]
        },
        {
            "x": 9,
            "y": 2,
            "size": 3,
            "rowOrcolumn": "column",
            "others": [
                {
                    "x": 9,
                    "y": 3
                },
                {
                    "x": 9,
                    "y": 4
                }
            ]
        },
        {
            "x": 1,
            "y": 6,
            "size": 3,
            "rowOrcolumn": "column",
            "others": [
                {
                    "x": 1,
                    "y": 7
                },
                {
                    "x": 1,
                    "y": 8
                }
            ]
        },
        {
            "x": 0,
            "y": 7,
            "size": 2,
            "rowOrcolumn": "column",
            "others": [
                {
                    "x": 0,
                    "y": 8
                }
            ]
        },
        {
            "x": 7,
            "y": 8,
            "size": 2,
            "rowOrcolumn": "column",
            "others": [
                {
                    "x": 7,
                    "y": 9
                }
            ]
        },
        {
            "x": 4,
            "y": 5,
            "size": 2,
            "rowOrcolumn": "column",
            "others": [
                {
                    "x": 4,
                    "y": 6
                }
            ]
        },
        {
            "x": 9,
            "y": 9,
            "size": 1,
            "rowOrcolumn": "row",
            "others": []
        },
        {
            "x": 7,
            "y": 2,
            "size": 1,
            "rowOrcolumn": "row",
            "others": []
        },
        {
            "x": 6,
            "y": 6,
            "size": 1,
            "rowOrcolumn": "row",
            "others": []
        },
        {
            "x": 9,
            "y": 1,
            "size": 1,
            "rowOrcolumn": "row",
            "others": []
        }
    ]

 
        let xLocal = parseInt(x);
        let yLocal = parseInt(y);

        for (let i = 0; i < temp.length; i++) {
          if(temp[i].x!==fromX||temp[i].y!==fromY){
          if (
            parseInt(temp[i].x) === xLocal &&
            parseInt(temp[i].y) === yLocal
          ) {
            return true;
          }
          for (let j = 0; j < temp[i].others.length; j++) {
            if (
              parseInt(temp[i].others[j].x) === xLocal &&
              parseInt(temp[i].others[j].y) === yLocal
            ) {
              return true;
            }
          }
        }
        }
        return false;
}
module.exports=itIncludesCoordinate


