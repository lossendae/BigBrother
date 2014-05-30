var app = angular.module("nvd3TestApp", ['nvd3ChartDirectives']);

function ExampleCtrl($scope) {

    var visits = [
        ["3/09/2013", 5691],
        ["3/10/2013", 5403],
        ["3/11/2013", 15574],
        ["3/12/2013", 16211],
        ["3/13/2013", 16427],
        ["3/14/2013", 16486],
        ["3/15/2013", 14737],
        ["3/16/2013", 5838],
        ["3/17/2013", 5542],
        ["3/18/2013", 15560],
        ["3/19/2013", 18940],
        ["3/20/2013", 16970],
        ["3/21/2013", 17580],
        ["3/22/2013", 17511],
        ["3/23/2013", 6601],
        ["3/24/2013", 6158],
        ["3/25/2013", 17353],
        ["3/26/2013", 17660],
        ["3/27/2013", 16921],
        ["3/28/2013", 15964],
        ["3/29/2013", 12028],
        ["3/30/2013", 5835],
        ["3/31/2013", 4799],
        ["4/01/2013", 13037],
        ["4/02/2013", 16976],
        ["4/03/2013", 17100],
        ["4/04/2013", 15701],
        ["4/05/2013", 14378],
        ["4/06/2013", 5889],
        ["4/07/2013", 6779],
        ["4/08/2013", 16068]
    ];
    var uvs = [
        ["3/09/2013", 4346],
        ["3/10/2013", 4112],
        ["3/11/2013", 11356],
        ["3/12/2013", 11876],
        ["3/13/2013", 11966],
        ["3/14/2013", 12086],
        ["3/15/2013", 10916],
        ["3/16/2013", 4507],
        ["3/17/2013", 4202],
        ["3/18/2013", 11523],
        ["3/19/2013", 14431],
        ["3/20/2013", 12599],
        ["3/21/2013", 13094],
        ["3/22/2013", 13234],
        ["3/23/2013", 5213],
        ["3/24/2013", 4806],
        ["3/25/2013", 12639],
        ["3/26/2013", 12768],
        ["3/27/2013", 12389],
        ["3/28/2013", 11686],
        ["3/29/2013", 8891],
        ["3/30/2013", 4513],
        ["3/31/2013", 3661],
        ["4/01/2013", 9503],
        ["4/02/2013", 12666],
        ["4/03/2013", 12635],
        ["4/04/2013", 11394],
        ["4/05/2013", 10530],
        ["4/06/2013", 4521],
        ["4/07/2013", 5109],
        ["4/08/2013", 11599]
    ];

    function pDate(str){
        var p = str.split("/");
        return new Date(p[2], p[0] - 1, p[1]);
    }

    angular.forEach(visits, function(v){
        v[0] = pDate(v[0]);
    });
    angular.forEach(uvs, function(v){
        v[0] = pDate(v[0]);
    });

    $scope.exampleData = [
        {
            "key": "Visits",
            "values": visits
        },
        {
            "key": "Pageviews",
            "area": true,
            "values": uvs
        }
    ];

    var colorArray = ['#8FB8F0', '#C5DE8A'];
    $scope.themeColor = function() {
        return function(d, i) {
            return colorArray[i];
        };
    }

    $scope.yFunction = function () {
        return function (d) {
            return d[1];
        }
    };

    $scope.xFunction = function () {
        return function (d) {
            return d[0];
        }
    };

    $scope.xAxisTickFormat = function () {
        return function (d) {
            return d3.time.format('%d %b')(new Date(d));  //uncomment for date format
        }
    }

    $scope.$on('tooltipShow.directive', function (angularEvent, event) {
        console.log('elementClick', arguments);
        angularEvent.targetScope.$parent.event = event;
        angularEvent.targetScope.$parent.$digest();

    });
}
