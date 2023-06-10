"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[307],{78307:(k,v,s)=>{s.r(v),s.d(v,{CanvasSignatureAppComponent:()=>A,CanvasSignatureAppModule:()=>L});var t=s(38687),o=s(51252);const g="canvas",i=(0,o.ZF)(g),T=(0,o.P1)(i,n=>n.batches),Z=(0,o.P1)(i,n=>n.batches.length>0),y=(0,o.P1)(i,n=>n.stack.length>0),C=(0,o.PH)("[canvas] UNDO"),h=(0,o.PH)("[canvas] REDO"),m=(0,o.PH)("[canvas] CLEAR"),f=(0,o.PH)("[canvas] NEW_CANVAS_DATA_BATCH",(0,o.Ky)());var U=s(35834),c=s(76707),w=s(31888),D=s(25290),l=s(18205);let F=(()=>{class n{constructor(a){this.store=a,this.allData$=this.store.select(T),this.allowedToUndo$=this.store.select(Z),this.allowedToRedo$=this.store.select(y)}onNewData(a){this.store.dispatch(f({batch:a}))}onClear(){this.store.dispatch(m())}undo(){this.store.dispatch(C())}redo(){this.store.dispatch(h())}ngOnInit(){}}return n.\u0275fac=function(a){return new(a||n)(t.Y36(o.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-canvas-signature"]],decls:25,vars:9,consts:[[3,"batches","newBatchOfPixels"],["mat-raised-button","",3,"disabled","click"],["mat-button","",3,"click"]],template:function(a,r){1&a&&(t.TgZ(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),t._uU(3,"Canvas Signature"),t.qZA()(),t.TgZ(4,"mat-card-content")(5,"app-canvas-drawer",0),t.NdJ("newBatchOfPixels",function(M){return r.onNewData(M)}),t.ALo(6,"async"),t.qZA()(),t.TgZ(7,"mat-card-actions"),t._uU(8," \xa0 \xa0 "),t.TgZ(9,"button",1),t.NdJ("click",function(){return r.undo()}),t.ALo(10,"async"),t._uU(11," Undo "),t.TgZ(12,"mat-icon"),t._uU(13,"undo"),t.qZA()(),t._uU(14," \xa0 \xa0 "),t.TgZ(15,"button",1),t.NdJ("click",function(){return r.redo()}),t.ALo(16,"async"),t._uU(17," Redo "),t.TgZ(18,"mat-icon"),t._uU(19,"redo"),t.qZA()(),t._uU(20," \xa0 \xa0 "),t.TgZ(21,"button",2),t.NdJ("click",function(){return r.onClear()}),t._uU(22," Clear "),t.TgZ(23,"mat-icon"),t._uU(24,"clear"),t.qZA()()()()),2&a&&(t.xp6(5),t.Q6J("batches",t.lcZ(6,3,r.allData$)),t.xp6(4),t.Q6J("disabled",!t.lcZ(10,5,r.allowedToUndo$)),t.xp6(6),t.Q6J("disabled",!t.lcZ(16,7,r.allowedToRedo$)))},dependencies:[U.I,c.a8,c.hq,c.dn,c.dk,c.n5,w.lW,D.Hw,l.Ov],styles:["mat-card-content[_ngcontent-%COMP%]{margin-bottom:-45px}"]}),n})(),A=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-canvas-signature-app"]],decls:1,vars:0,template:function(a,r){1&a&&t._UZ(0,"app-canvas-signature")},dependencies:[F]}),n})();var b=s(42363),S=s(61941),p=s(70426);let N=(()=>{class n{constructor(a){this.actions$=a}}return n.\u0275fac=function(a){return new(a||n)(t.LFG(p.eX))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var u=s(40409);const P=(0,o.Lq)({batches:[],stack:[]},(0,o.on)(f,(n,e)=>{const a=u.cloneDeep(n);return a.batches.push(u.cloneDeep(e.batch)),{...n,...a}}),(0,o.on)(C,n=>{const e=u.cloneDeep(n);return e.stack.push(e.batches.pop()),{...n,...e}}),(0,o.on)(h,n=>{const e=u.cloneDeep(n);return e.batches.push(e.stack.pop()),{...n,...e}}),(0,o.on)(m,n=>({batches:[],stack:[]})));let B=(()=>{class n{}return n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,S.SH,S.qX,o.Aw.forFeature(g,P),p.sQ.forFeature([N])]}),n})();const R=(0,o.Lq)({loggedUser:""}),H=[{path:"",component:A}];let L=(()=>{class n{}return n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,B,o.Aw.forFeature("canvas-signature-app",R),p.sQ.forFeature(),b.Bz.forChild(H)]}),n})()}}]);