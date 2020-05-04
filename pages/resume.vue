<template>
  <!--Resume Section -->
  <div id="resume" class="content col-md-12">
    <div class="row">
      <div class="page-title">
        <h2>My Resume </h2>
      </div>
      <div class="col-md-12 page">

        <!--Resume Work Timeline-->
        <div class="resume-education col-md-12">
          <div class="rounded-icon">
            <i class="fa fa-suitcase"></i>
          </div>
          <div class="resume-out">
            <div class="resume-info" v-for="(job,index) in jobStory" :key="index">
              <h2 class="info-title" v-html="job.heading"/>
              <span class="info-date" v-html="job.year" />
              <p v-html="job.description"/>
            </div> <!-- .resume-info -->
          </div> <!-- .resume-out end -->
        </div> <!-- .resume-education .col-md-12 end -->
        <!--Resume Education Timeline-->
        <div class="resume-education col-md-12">
          <div class="rounded-icon">
            <i class="fa fa-graduation-cap"></i>
          </div>
          <div class="resume-out">
            <div class="resume-info">
              <h2 class="info-title">Software Engineer, Master Degree | South Federal University @ Russia</h2>
              <span class="info-date">2015 - 2017 </span>
              <p>Southern Federal University, abbreviated as SFedU and formerly known as Rostov State University (1957–2006), is a public university in Rostov Oblast, Russia with campuses in Rostov-on-Don and Taganrog.</p>
            </div> <!-- .resume-info -->
            <div class="resume-info">
              <h2 class="info-title">Software Engineer, Bachelor Degree | Donesk Technical University @ Ukraine </h2>
              <span class="info-date">2011 - 2014 </span>
              <p>Donetsk National Technical University (DonNTU) is the first higher education establishment in the Donbas Region and one of the first technical universities in Ukraine. 27,000 students study at 7 faculties, 60 specialities being their major. There are 28 correspondent members and academicians of the engineering academies, 18 honorary researchers and professors among the academics of the university. A number of scientists of DonNTU are honorary and full members of foreign organizations and academies.</p>
            </div> <!-- .resume-info -->
            <div class="resume-info">
              <h2 class="info-title">Zaporizhskiy Technical Lyceum @ Ukraine</h2>
              <span class="info-date">2009 - 2011</span>
              <p>National level high school with math, phisics and programming specialization.</p>
            </div> <!-- .resume-info -->
          </div> <!-- .resume-out end -->
        </div> <!-- .resume-education .col-md-12 end -->

        <!--footer-->
        <footer class="footer"> <p>  Copyright © 2020 All right reserved </p></footer>

      </div><!-- .col-md-12 .page -->
    </div><!--.row end-->
  </div> <!-- #resume .content .col-md-12 end -->

</template>

<script>
    export default {

      data(){
        return {
          jobStory: [
            {
              'year': '2016 werwer- Present',
              'heading': 'Upwork Freelance PHP & JS Developer',
              'description': 'Top Rated Freelancer with technology stack Laravel, Vue.JS, GraphQL, ReactJS. Over 1300+ hours tracked.',
            },
            {
              'year': '2018 - 2019',
              'heading': 'Director of Corporate Technology & Infrastructure — Noxster Company @ Los Angeles, USA',
              'description': 'My key responsibilities: integration new frameworks and progressive web technologies into development process. Technical analysis and risk management mostly priority clients',
            },
            {
              'year': '2017 - 2019',
              'heading': 'Chief Executive Officer — Blackbox Studio @ Taganrog, Russia',
              'description': 'My key responsibilities: Business Analysis, Strategic Planning. ',
            },
            {
              'year': '2016 - 2017',
              'heading': 'Chief Technology Officer — BlackBox Studio @ Taganrog, Russia',
              'description': 'My key responsibilities: integration new frameworks and progressive web technologies into development process. Technical analysis and risk management mostly priority clients',
            },
            {
              'year': '2013 - 2016',
              'heading': 'Senior PHP Developer — BlackBox Studio @ Taganrog, Russia',
              'description': 'Website development based on LAMP Stack. Frameworks: CodeIgnitor, CakePHP & Magento 1.9',
            },
            {
              'year': '2013 - 2014',
              'heading': 'PHP Middle Developer — armor.mobi',
              'description': 'Develop architecture for mobile browser MMORPG. Server configuration (Apache, Nginx, Memcache, PHP 5.3). Highload ready.',
            },
            {
              'year': 'Aug. 2012 - Jan. 2013',
              'heading': 'Java Junior Developer — Freelance',
              'description': 'Create client—server Java RESTful GUI application using SWT library and HTMLUnit—based bot',
            },
            {
              'year': '2010 - oct. 2012',
              'heading': 'PHP Junior Developer — CheckLinks',
              'description': 'Development modules for Drupal 6.20',
            }
          ]
        }
      },
    }
</script>

<style scoped>

</style>
