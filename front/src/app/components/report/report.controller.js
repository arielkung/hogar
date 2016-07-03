angular.module('hogarApp').controller('ReportController', function ($scope, $rootScope, $state) {
    var selection = {
        gender: '',
        ageRange: ''
    }

    var selectionCollection = [];
    var needsCollection = [];

    if ($rootScope.report == undefined) {
        $rootScope.report = {
            position: '',
            selectionCollection: [],
            needsCollection: []
        }
    }

    var position = "";

    function cleanSelection() {
        selection.gender = '';
        selection.ageRange = '';
    }

    $scope.setGender = function (gender) {
        selection.gender = gender;
    }

    $scope.setAgeRange = function (ageRange) {
        selection.ageRange = ageRange;

        if (selection.gender && selection.ageRange) {
            selectionCollection.push({
                gender: selection.gender,
                ageRange: selection.ageRange
            });
        }

        cleanSelection();
    }

    $scope.newReport = function () {
        position = '123,123.312.123';
        $rootScope.report.position = position;
        $state.go('report_create');
    }

    $scope.doReport = function () {
        $rootScope.report.selectionCollection = selectionCollection;
        $rootScope.report.needCollection = [];
        ['elder', 'shoes', 'coat', 'food'].forEach(function (el) {
            if (needsCollection[el]) {
                $rootScope.report.needsCollection.push(el);
            }
        });
        $state.go('report_success');

    }

    $scope.toggleNeed = function (need) {
        if (needsCollection[need]) {
            delete needsCollection[need];
        } else {
            needsCollection[need] = true;
        }
        console.log(needsCollection);
    }

    $scope.position = position;
    $scope.report = $rootScope.report;
    $scope.selection = selection;
    $scope.selectionCollection = selectionCollection;
    $scope.needsCollection = needsCollection;
});