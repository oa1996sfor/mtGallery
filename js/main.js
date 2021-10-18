console.log('Starting up');
const myEmail = 'omar.amer.asfor.96@gmail.com';

$(onInit)

function onInit(){
    renderPortfolioItems();
    renderPortfolioModals();
   

}


function  renderPortfolioItems(){
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal-${proj.id}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.title}</h4>
          <p class="text-muted">${proj.desc}</p>
        </div>
      </div>
        `
    })
    $('.projects-container').html(strHtmls);
}

function renderPortfolioModals(){
    var projs = getProjs();
    var strHtmls = projs.map(function (proj) {
        return `
        <div class="portfolio-modal modal fade" id="portfolioModal-${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.title}</h2>
                    <p class="item-intro text-muted">${proj.id}</p>
                    <button class="btn btn-primary" onclick="onRunProject('${proj.url}')">
                    TRY IT!</button>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}Real.png" alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                      <li>Date: ${proj.publishedAt.getDate()}/${proj.publishedAt.getMonth()}/${proj.publishedAt.getFullYear()}</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    })
    $('.modal-container').html(strHtmls);
}

function onRunProject(url){

    window.open(url+'/index.html', '_blank').focus();

}

function onSubmitContact(){
    const email = document.getElementById('email-address').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    if (!email || !subject || !message) return;
    var urlMail = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=SUBJECT&body=${email}:${message}&bcc=someone.else@example.com`;
    window.open(urlMail, '_blank').focus();
    document.getElementById('email-address').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}