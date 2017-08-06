angular.module("listApp",['ngAnimate'])
.controller("listCtrl",function($http,$scope){
	let totalData = [];
 	$http({
        url: 'https://jsonplaceholder.typicode.com/photos',
        method: "GET"
    })
    .then(function(x) {
    	if(x.status === 200 && x.data){    		
    		totalData = x.data;
    		$scope.data = totalData.slice(0,12)
    	}
    }, 
    function(e) { 
		console.log(e)
    });
    var scroll = function(){
		this.total = 1,
		this.append = function(data){
			this.total++;
			$scope.$apply(function() {
				console.log(data)
				angular.forEach(data,function(a){
					$scope.data.push(a);
				})
				//angular.extend(,data);
			})
		}

	}	
    let Scroll = new scroll();  
    window.onscroll = function(){
	   if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {	
	   		let offset = Scroll.total * 12;  
	   		console.log(offset) 
	   		if(offset < totalData.length){	
		      	let temp = totalData.slice(offset+1,offset + 13);		      	
	   			console.log(temp) 		
		   	  	Scroll.append(temp);
	   		}
	   }
	};
});