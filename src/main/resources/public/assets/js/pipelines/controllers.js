/*******************************************************************************
 * Copyright (c) 2015 Unicon (R) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *******************************************************************************/
(function(angular, JSON) {
	'use strict';
	angular
	.module('LAP')
	.controller('PipelinesController',

		function PipelinesController($scope, $state, $translate, $translatePartialLoader, pipelines, PipelineDataService, Notification) {
		    $translatePartialLoader.addPart('pipelines');
		    $translate.refresh();
		    
			$scope.pipelines = pipelines;
			$scope.submitted = false;

			$scope.selectPipeline = function (pipeline) {$scope.selectedPipeline = pipeline;};
			
			$scope.startPipeline = function (type) {
				$scope.submitted = true;

				PipelineDataService
				.runPipeline(type)
				.then (
				    function (data) {
				    	if (data) {
				    		Notification.success('Pipeline complete');
				    	}
				    	else {
				    		Notification.error('Pipeline failed');
				    	}
				    	
				    	$scope.submitted = false;
				    }
				);
			};
		}
	
	);
})(angular, JSON);