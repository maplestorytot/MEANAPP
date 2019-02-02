Pagination


Creating the Paginator Angular Material Component
1) add the anglar material in app.module .ts
   MatPaginatorModule
2) add to html
<post-list.component.html>
<!--length is howmany posts in total, page size is # posts per page, (page) is the event that occurs when you change the page size options
and onChangedPage is a method created in the component.ts behind it...$event is allow you to receive more data from the method/event occurring-->
<mat-paginator [length]='totalPosts' [pageSize]='postsPerPage' [pageSizeOptions]='pageSizeOptions' (page)='onChangedPage($event)'=>
3) underlying <post-list.component.ts>
in exports
 totalPosts=10;
  postsPerPage=2;
  pageSizeOptions=[1,2,5,10];

<!--The function takes $event... this event is imported PageEvent... it contains data on the variables above
{previousPageIndex: 0, pageIndex: 1, pageSize: 2, length: 10}-->
  onChangedPage(pageData:PageEvent){
    console.log(pageData);
  }



Creating routes to the front end to the backend:
This is the route for which the front end accesses the database for the posts... it only returns a certain amount backend on queries, eg pagesize, which page its only
eg http://localhost:3000/api/posts?pagesize=1&page=4

<posts.js>
//1)a get request for data from server
//must use this url to reach this code
<router.get('',(req,res,next)=>{
  //2)when paginator does it stuff can send querys to get route to handle
  //eg http://localhost:4200/api/posts/pagesize=2&currentPage=1
  //+ converts then from string to numbers which can be used for math under
  const pageSize= +req.query.pagesize;
  const currentPage= +req.query.page;
  const postQuery=Post.find();

  //3) if user does have queries, if not then send everything
  if(pageSize&&currentPage){
    //6)continues to .then and returns all though entries after being filterd
    postQuery
    //4) skip allows us to skip pages eg if on page 2 and each page has 10 posts, will do 10*(2-1)=10...thus first 10 will not be shown
    .skip(pageSize*(currentPage-1))
    //5)limits amount of posts per page
    .limit(pageSize);
  }
  //return all entries
  //Post.find() will only occur when .then happens
  postQuery.then(documents=>{
      res.status(200).json({
      message:'Posts fetched Successfully',
      posts:documents
  });});
//the url used NEED ?
});




Connecting get route to front end this.http.get
1) in post service get posts


<!--//two backticks allows cool features
    //creating the url queries-->
<const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts"+queryParams) 
    

2) post list component.ts
ngOnInit() {
    this.postsService.getPosts(this.postsPerPage,1);
      -    //sending bad on the page on the html

3)
  onChangedPage(pageData:PageEvent){
    //starts at 0...
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  //when switching pages, change the variables and send into post service...

3) Making max amount of pots being fetched
<posts.js> router.get


  let fetchedPosts;

//posts that will be gotten back, documents


 postQuery.then(documents=>{
     fetchedPosts=documents;
     return Post.count();
   
  }).then(count=>{ res.status(200).json({
    message:'Posts fetched Successfully',
    posts:documents,
    maxPosts:count
  })

  //sending back the count also

4)  Change so that subject also contains post count in an object now
private postsUpdated = new Subject<{posts:Post[],postCount:number}>();

5) The get route also sends back posts and maxCount which when subscribed willl be able to take that and do posts updated for the rest of the app.
 map(postData => {
          //Returning the posts and maxPosts
          //transformedPostData.posts;
          return {
          posts:postData.posts.map(post => {
            //replacing every post with a new javascript obeject
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath:post.imagePath
            };
          }),
          //returning the max number of posts also from the data passed to the subscribe
          maxPosts:postData.maxPosts}
        })  //transformed is the array put back through .map
      .subscribe(transformedPostData => {

        //makes main posts be the posts data that was gotten from the http request
        this.posts = transformedPostData.posts;

        //a subject that is emitting out new changes for other observers in the app
        this.postsUpdated.next({posts:[...this.posts],postCount:transformedPostData.maxPosts});



How to display only based on number of posts...
1)<mat-paginator [length]='totalPosts'> length makes the max amount....
2) when getting the posts in subscribe, will update and then pass to html [length]="totalPosts"

.subscribe((postsData: {posts:Post[],postCount:number}) => {
this.totalPosts=postsData.postCount;



How to make delete with Pagination
1) click delete does the delete method in 2) and then just do get posts for entire thing to restart it

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(()=>
  {
    this.postsService.getPost(this.postsPerPage,this.currentPage);
  });
  }


2)
deletePost(postId: string) {
   return this.http
      .delete("http://localhost:3000/api/posts/" + postId);










Extras::


  HOW TO USE HTML Properly
  1) how to make events... can check official guides eg angular Material....
  2) <mat-paginator [length]='totalPosts' [pageSize]='postsPerPage' [pageSizeOptions]='pageSizeOptions' (page)='onChangedPage($event)'=>
[length] - [] allows you to connect to the underlying post-list.component.ts variables eg totalPosts, postsPerPage
(click) is click event
(page)='onChangedPage($event)' is the event that occurs when you change the page size options
and onChangedPage is a method created in the component.ts behind it...$event is allow you to receive more data from the method/event occurring-

<!--The function takes $event... this event is imported PageEvent... it contains data on the variables above
{previousPageIndex: 0, pageIndex: 1, pageSize: 2, length: 10}-->
  onChangedPage(pageData:PageEvent){
    console.log(pageData);
  }
3) to make if and for statements
<mat-spinner *ngIf="isLoading"></mat-spinner>
     <mat-expansion-panel *ngFor="let postindex of posts">




Why we use NGONIT/Displaying our data


Description: it always occurs when the component is created and only occurs once...
  -for postlist, when the component is loaded, it is a good idea to display the posts, thus will immediately call <getposts>
        -ways to load the component/create it is through routing 
        -<app-routing.moudle.ts>
        

          const routes: Routes = [
          // empty path is main page
          { path: "", component: PostListComponent },
          //localhost:4200/create
          { path: "create", component: PostCreateComponent },
          { path: "edit/:postId", component: PostCreateComponent }

           ];
          
         --this routes create the component at that page along with the header in 
  <app.component.html>
            <app-header></app-header>
            <main>
                <!--Tells where routes can be rendered-->
            <router-outlet></router-outlet>
            </main>
                  

  -it is also a good place to call the subjecct listener <this.postsSub = this.postsService
      .getPostUpdateListener()>
      -this is because when the app is noticed for when it needs to update the front end, it will emit signals which
      <subscribe> will be listening for... which you can then once again <getposts>
      -the values are then converte to html through <mat-paginator [length]='totalPosts' [pageSize]='postsPerPage' [pageSizeOptions]='pageSizeOptions' (page)='onChangedPage($event)' *ngIf="posts.length>0">
      see above for more
  
export class PostListComponent implements OnInit /*,OnDestroy*/ {

  totalPosts=10;
  postsPerPage=2;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  isLoading=false;
  posts: Post[] = [];
  private postsSub: Subscription;
  //Injecting Post Service
  //postsService is the name, PostService is the type after importing it
  constructor(public postsService: PostService) {}
  <ngOnInit()> {
    //sending bad on the page on the html
    <this.postsService.getPosts(this.postsPerPage,1);>
    //listener to the subject...subscribes to the service, which has
    //arguments: next, error,complete
    this.isLoading=true;

  <this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: {posts:Post[],postCount:number}) => {
        console.log('hefae');
        this.isLoading=false;
        //this.posts is the empty one... posts is the one that was from the main list of posts that just got updated
        this.posts = postsData.posts;
        this.totalPosts=postsData.postCount;
      });
  }
