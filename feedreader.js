/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

       
        function loop_url(i){
            it('has all URLs defined', function(){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            });
        }

        for (var x = 0; x < allFeeds.length; x++){
            loop_url(x);
        }
   
        
        function loop_name(i){
            it('has all names defined', function(){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            });
        }

        for (var x = 0; x < allFeeds.length; x++){
            loop_name(x);
        }
    });
    
  
    describe('The menu', function(){
        var body = document.body,
        className = className; 
    
        it('should hide menu element by default', function() { 
             expect($("body").hasClass('menu-hidden')).toBe(true);
        });
    
        it('should show menu changes visibility when the menu icon is clicked', function(){

        //  On first click menu appears and the menu-hidden class is removed from the body element.
            $('a.menu-icon-link').trigger('click');
        //  Expect body class to be null.
            expect($("body").hasClass('menu-hidden')).toBe(false);
    
        //  On second click menu dissappears and the menu-hidden class is onto the body element.
            $('a.menu-icon-link').trigger('click');
            expect($("body").hasClass('menu-hidden')).toBe(true);
        });

    });
   
   
    describe('Initial Entries', function(){
    
        beforeEach(function(done){
            loadFeed(0,done);
        });
            it("should have at least 1 entry", function(done){
                expect($('.feed').length).toBeGreaterThan(0);
                expect($('.entry').length).toBeGreaterThan(0);
                done();
            });
    });
        
    describe('New Feed Selection', function(){
    
        beforeEach(function(done) {
            // Load feeds new html.
            loadFeed(0, function() {
                title = $(".feed .entry h2").html(); 
                header = $("h1.header-title").html(); 
                loadFeed(1, function() {
                    done(); 
                });
            });
        });

        it('has some other content', function(done) {
            // Compare feeds. 
            expect($(".feed .entry h2").html()).not.toBe(title); 
            done(); 
        }); 

        it('has a new feed loaded', function(done) {
            // Compare feeds.
            expect($("h1.header-title").html()).not.toBe(header);
            done(); 
        });
        // Restore. 
        afterAll(function(done) {
            loadFeed(0, done); 
        });

    });
            
}());
