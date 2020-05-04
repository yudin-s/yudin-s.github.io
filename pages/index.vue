<template>

  <div id="about" class="content col-md-12 fadeInUp">
    <div class="row">
      <div class="page-title">
        <h2>About Me </h2>
      </div>
      <!-- Info -->
      <div class="col-md-12 pinfo">
        <div class="col-md-12 about-info">
          <ul class="info-list">
            <li>Full Name : <span>Sergei Iudin</span> </li>
            <li>Birthday : <span>7 April 1994</span> </li>
            <li>Job : <span>Freelancer</span> </li>
            <li>GitHub : <span>https://github.com/yudin-s</span> </li>
            <li>Email : <a href="mailto:advictoriam2010@protonmail.com"><span>Click!</span></a> </li>
            <li>Skype : <a href="skype:i.stalinz"><span>i.stalinz</span></a> </li>
          </ul>
        </div> <!-- .col-md-4 .about-info -->
      </div><!-- .col-md-12 .spotted -->

      <div class="col-md-12 spotted ptext">
        <div class="col-md-12 about-text">
          <h2 class="section-title">Rockstar FullStack Developer</h2>
          <p>I'm 10 years experienced developer with a focus on modern web technologies. In my opinion clean code with well-thought-out architecture is key for the successful implementation of any project.</p>

          <h2 class="section-title">Key Achievements</h2>

          <p>
            - My speed optimization and development increased sales up to 50%<br />
            - Websites processing 1000+ active clients per second.<br />
            - Clients start making money after a week of development from idea to project.<br />
            - Google PageScore from 10 to 80 points after I make server-side, image optimization, and connect HTTP/2 Push data sending.</p>

          <h2 class="section-title">Main Skills</h2>

          <p>- Backend PHP: Laravel, Wordpress, Drupal, Magento, CakePHP, CodeIgnitor. <br />
            - Frontend Frameworks: Vue.JS, Nuxt.JS, ReactJS, AngularJS <br />
            - Backend JS: NodeJS, Nuxt.JS, GraphQL, Express, Socket.IO. <br />
            - Databases: MySQL, MariaDB, Redis, MongoDB, Oracle, PostgreSQL.<br />
            - Unit testing: TDD, Jest, phpUnit.</p>

          <h2 class="section-title">Additional skills &amp; experience</h2>

          <p>- Software Architect with UML diagrams and Bosch diagrams <br />
            - Linux Administration: HHVM, Docker, Nginx, Apache, Highload optimization.<br />
            - Continuous Integration: TravisCI, Jenkins. <br />
            - Data Mining: RapidMiner CE, RapidMiner Server CE, Weka<br />
            - AI using TensorFlow</p>

          <p>Let's start making top-level websites and up to air your business together!</p>
        </div><!--.col-md-12 .about-text end-->
      </div><!-- .col-md-12 .spotted -->
      <!-- Skills -->
      <div class="col-md-12 col-sm-12 col-xs-12 gray-bg services">
        <div class="row services__row">
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-file-code-o"></i>
          <div class="features">
            <b>Development</b>
            <p>Creating </p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-desktop"></i>
          <div class="features">
            <b>Web Design</b>
            <p>Mauris eleifend dapibus</p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-picture-o"></i>
          <div class="features">
            <b>Illustrations</b>
            <p>Posuere ac sem nec</p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-code"></i>
          <div class="features">
            <b>Development</b>
            <p>Curabitur euismod sapien</p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-search"></i>
          <div class="features">
            <b>Seo Optimization</b>
            <p>Etiam vitae condimentum</p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        <div class="service col-md-4 col-sm-6">
          <i class="fa fa-support"></i>
          <div class="features">
            <b>Support</b>
            <p>Improving and extending</p>
          </div>
        </div> <!-- .service .col-md-4 .col-sm-6 end -->
        </div>
      </div> <!-- .col-md-12 .services -->

      <footer class="footer"> <p>  Copyright © 2020 All right reserved </p></footer>


    </div><!--.row end-->
  </div> <!-- #about .content .col-md-12 end -->

</template>

<script>

import DefaultLayout from "@/components/Layout/DefaultLayout"
import Profile from "@/components/Common/Profile"
import Navigation from "@/components/Common/Navigation"

export default {
  components: {
    Navigation,
    Profile,
    DefaultLayout
  },
  data(){
    return {
      links: [
        {
          icon: '',
          to: '/',
          title: 'about',
        },
      ],
    };
  }
}
</script>

<style>
  .about-text p{
    margin-bottom: 20px;
  }
  .services__row{
    padding: 20px;
  }
</style>
