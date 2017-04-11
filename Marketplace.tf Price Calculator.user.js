// ==UserScript==
// @name         Marketplace.tf Price Calculator
// @namespace    https://github.com/NetroScript
// @version      0.1
// @description  A simple price Calculator on the dashboard page so you know for how much you have to sell an item if you want a specific amount of keys or how many keys you get for an specific price (Also works with just calculating the store commission).
// @author       Netroscript
// @match        https://marketplace.tf/dashboard
// @match        http://marketplace.tf/dashboard
// @require      code.jquery.com/jquery-latest.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	let storepart = 0.9; //How much of your item you actually get (currently 10% get subtracted -> 90% are for you)


	//Custom CSS
	let css = `<style>
.dollar {
    display: inline-block;
    position: absolute;
    margin-top: 9px;
    margin-left: 7px;
    font-size: 13px;
}

input[type="number"] {
    padding-left: 14px;
}

.tip {
    color: rgb(200,200,200);
    font-size: 11px;
    max-width: 310px;
    display: block;
}

#output{
font-weight: bold;
}
</style>`;

	//The HTML which gets added
	let html = `<div class="panel panel-info">
    <div class="panel-heading">Price Calculator</div>
    <table class="table table-bordered">
        <tbody>
            <tr>
                <td>Key price: <span class="tip">(Set to 1 if you just want to calculate with the Store Commission)</span></td>
                <td>
                    <div class="dollar">$</div>
                    <input type="number" min="0" value="2.10" step="0.01" id="keyprice" class="form-control input-sm">
                </td>
            </tr>
            <tr>
                <td>How many keys could I get for this price:</td>
                <td>
                    <div class="dollar">$</div>
                    <input id="wprice" type="number" value="0" step="0.01" class="form-control input-sm">
                </td>
                <td>
                    <div>
                        <button class="btn btn-primary btn-sm" id="getKfP">Calculate</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>I want to buy X keys:</td>
                <td>
                    <input id="wkeys" type="number" step="1" value="0" class="form-control input-sm">
                </td>
                <td>
                    <div>
                        <button class="btn btn-primary btn-sm" id="getPfK">Calculate</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="panel-body">
        <h4 id="output"></h4>
    </div>
</div>`;


	//Adding HTML to main container and CSS to head
	$($("body .container")[1]).prepend(html);
	$("head").append(css);


	//All Javascript functionality here
	function main(){
		$("#getPfK").click(function(){

			let keyprice = parseFloat($("#keyprice").val());
			let amount = parseFloat($("#wkeys").val());
			let Price4Key = (amount * keyprice) / storepart;


			$("#output").html("For this amount of keys you would need at least " + Price4Key.toFixed(2) + '$ (~'+(Math.ceil(Price4Key*10)/10).toFixed(2)+'$). <span class="tip">(Store Commission already included)</span>');

		});


		$("#getKfP").click(function(){

			let keyprice = parseFloat($("#keyprice").val());
			let money = parseFloat($("#wprice").val());
			let Key4Price = (money * storepart) / keyprice;


			$("#output").html("For this money you could get " + Key4Price.toFixed(2) + ' Key'+((Key4Price>1 || Key4Price === 0) ? "s" : "") +' (~'+Math.floor(Key4Price)+' Key'+((Math.floor(Key4Price)>1 || Math.floor(Key4Price) === 0) ? "s" : "") +'). <span class="tip">(Store Commission already included)</span>');

		});

	}

	//Execute Main function with slight delay which the adding to Document might need
	setTimeout(main, 250);


    // Your code here...
})();