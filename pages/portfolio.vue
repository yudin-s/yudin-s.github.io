<template>
  <div id="portfolio" class="content col-md-12">
    <div class="row">
      <div class="page-title">
        <h2>My Portfolio </h2>
        <!-- Portfolio Filter -->
        <div class="portfolio_filter pull-right">
          <ul>
            <li class="select-cat" data-filter="*">All</li>
            <li data-filter=".web-design">Web Design</li>
            <li data-filter=".aplication">Applications</li>
            <li data-filter=".development">Development</li>
          </ul>
        </div> <!-- .portfolio-filter .pull-right end -->
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12 page">
        <!-- Portfolio Items -->
        <div class="portfolio_items">

          <div class="single_item web-design col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Picard Resume Template </h3>
                <p>Web Design</p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-1.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-1.jpg" alt="" />
            </div>
          </div>

          <div class="single_item web-design col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 2 </h3>
                <p> Web Design</p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-2.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-2.jpg" alt="" />
            </div>
          </div>

          <div class="single_item aplication col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 3 </h3>
                <p>Application </p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-3.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-3.jpg" alt="" />
            </div>
          </div>

          <div class="single_item web-design col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 4 </h3>
                <p>Web Design</p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-4.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-4.jpg" alt="" />
            </div>
          </div>

          <div class="single_item aplication col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 5</h3>
                <p>Application</p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-5.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-5.jpg" alt="" />
            </div>
          </div>

          <div class="single_item web-design col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3>Portfolio Work 6</h3>
                <p>Web Design</p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-6.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-6.jpg" alt="" />
            </div>
          </div>

          <div class="single_item development col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 7 </h3>
                <p>Development </p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-7.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-7.jpg" alt="" />
            </div>
          </div>

          <div class="single_item development col-md-4 col-sm-12 col-xs-12">
            <div class="work-inner">
              <div class="work-overlay">
                <h3> Portfolio Work 8 </h3>
                <p>Development  </p>
                <a href="work-single.html" class="link"><i class="fa fa-link"></i></a>
                <a href="images/work-8.jpg" class="image-link lightbox"> <i class="fa fa-search"></i></a>
              </div>
              <img src="images/t-work-8.jpg" alt="" />
            </div>
          </div>

        </div> <!-- .portfolio_items end -->



        <!--footer-->
        <footer class="footer"> <p>  Copyright © 2016 All right reserved </p></footer>

      </div><!-- .col-md-12 .page -->
    </div><!--.row end-->
  </div> <!-- #portfolio .content .col-md-12 end -->


</template>

<script>
    export default {
        name: "portfolio"
    }
</script>

<style scoped>

</style>
