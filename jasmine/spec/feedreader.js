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

         /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        function loop_url(i){
            it('has all URLs defined', function(){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            });
        }

        for (var x = 0; x < allFeeds.length; x++){
            loop_url(x);
        }
   
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function loop_name(i){
            it('has all names defined', function(){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            });
        }

        for (var x = 0; x < allFeeds.length; x++){
            loop_name(x);
        }
    });
    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
        var body = document.body,
        className = className; 
    
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should hide menu element by default', function() { 
             expect(body.className).toBe('menu-hidden');
        });
    
         /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('should show menu changes visibility when the menu icon is clicked', function(){

        //  On first click menu appears and the menu-hidden class is removed from the body element.
            $('a.menu-icon-link').trigger('click');
        //  Expect body class to be null.
            expect(body.className).not.toBe('menu-hidden');
    
        //  On second click menu dissappears and the menu-hidden class is onto the body element.
            $('a.menu-icon-link').trigger('click');
            expect(body.className).toBe('menu-hidden');
        });

    });
   
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
    
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0,done);
        });
            it("should have at least 1 entry", function(done){
                expect($('.feed').length).toBeGreaterThan(0);
                expect($('.entry').length).toBeGreaterThan(0);
                done();
            });
    });
        
    // TODO: Write a new test suite named "New Feed Selection"
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