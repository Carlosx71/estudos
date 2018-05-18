
var html = {
	
	head: function() {
		return '<div class="navbar navbar-default navbar-static-top">' +
		       '    <div class="container-fluid">' +
			   '       <div class="navbar-header">' +
			   '            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#exemplo-navbar-collapse" aria-expanded="false">' +
			   '                <span class="icon-bar"></span>' +
			   '                <span class="icon-bar"></span>' +
			   '                <span class="icon-bar"></span>' +
			   '            </button>' +
			   '            <a class="navbar-brand" href="#" target="_blank">App Include</a>' +
			   '        </div>' +
			   '        <div class="collapse navbar-collapse" id="exemplo-navbar-collapse">' +
			   '           <ul class="nav navbar-nav navbar-left">' +
			   '               <li><a href="pag1.html">Página 1&nbsp;<span id="info-filter"></span></a></li>' +
			   '               <li><a href="pag2.html">Página 2&nbsp;<span id="info-configuration"></span></a></li>' +
			   '           </ul>' +
			   '        </div>' +
			   '    </div>' +
			   '</div>';
	}	
}
document.write(html.head());