"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[917],{40917:(gt,g,S)=>{S.r(g),S.d(g,{TasksAppModule2:()=>Ct});var Z=S(40789),c=S(5311),x=S(78374);let J=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-tasks"]],decls:1,vars:0,template:function(s,n){1&s&&c._UZ(0,"app-tasks-engine")},directives:[x.A],encapsulation:2}),t})(),Y=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-tasks-app"]],decls:1,vars:0,template:function(s,n){1&s&&c._UZ(0,"app-tasks")},directives:[J],styles:[""]}),t})();var E=S(91869),e=S(25803),i=S(91086),u=S(52540);const m=(0,e.PH)("[tasks] INIT"),v=(0,e.PH)("[tasks] TOOGLE_SUBTASKS_MENU",(0,e.Ky)()),D=(0,e.PH)("[tasks] FETCH_TASKS"),R=(0,e.PH)("[tasks] FETCH_TASKS_SUCCESS",(0,e.Ky)()),Q=(0,e.PH)("[tasks] FETCH_TASKS_ERROR",(0,e.Ky)()),y=(0,e.PH)("[tasks] ADD_TASK",(0,e.Ky)()),b=(0,e.PH)("[tasks] ADD_TASK_SUCCESS",(0,e.Ky)()),X=(0,e.PH)("[tasks] ADD_TASK_ERROR",(0,e.Ky)()),h=((0,e.PH)("[tasks] UPDATE_TASK",(0,e.Ky)()),(0,e.PH)("[tasks] UPDATE_TASK_SUCCESS",(0,e.Ky)())),V=(0,e.PH)("[tasks] UPDATE_TASK_ERROR",(0,e.Ky)()),P=(0,e.PH)("[tasks] DELETE_TASK",(0,e.Ky)()),F=(0,e.PH)("[tasks] DELETE_TASK_SUCCESS",(0,e.Ky)()),q=(0,e.PH)("[tasks] DELETE_TASK_ERROR",(0,e.Ky)()),st=(0,e.Lq)({tasks:[]},(0,e.on)(R,(t,{tasks:o})=>Object.assign(Object.assign({},t),{tasks:u.cloneDeep(o)})),(0,e.on)(v,(t,{task:o})=>{const s=u.cloneDeep(t);return s.tasks=s.tasks.map(n=>(n.selected=n.id===o.id&&!o.selected,n)),Object.assign(Object.assign({},t),s)}),(0,e.on)(b,(t,{task:o})=>{const s=u.cloneDeep(t);return s.tasks.push(o),Object.assign(Object.assign({},t),s)}),(0,e.on)(h,(t,{task:o})=>{const s=u.cloneDeep(t);return s.tasks=s.tasks.map(n=>n.id===o.id?u.merge(n,o):n),Object.assign(Object.assign({},t),s)}),(0,e.on)(F,(t,{task:o})=>{const s=u.cloneDeep(t);return s.tasks=s.tasks.filter(n=>n.id!==o.id),Object.assign(Object.assign({},t),s)}));var d=S(23239),l=S(14104),T=S(23877),k=S(90545),K=S(69186),p=S(66544);const A="tasks";let O=(()=>{class t{constructor(s,n){this.httpClient=s,this.stor=n}getAll(){return this.httpClient.get(`${p.ho}/${A}/models`)}create(s){return this.httpClient.post(`${p.ho}/${A}/model`,s)}update(s){return this.httpClient.put(`${p.ho}/${A}/model/${s.id}`,s)}delete(s){return this.httpClient.delete(`${p.ho}/${A}/model/${s.id}`)}}return t.\u0275fac=function(s){return new(s||t)(c.LFG(E.eN),c.LFG(e.yh))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac}),t})(),H=(()=>{class t{constructor(s,n){this.actions$=s,this.service=n,this.init=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(m),(0,d.w)(()=>(0,l.of)(D())))),this.fetchTasks=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(D),(0,d.w)(()=>this.service.getAll().pipe((0,T.U)(r=>R({tasks:r})),(0,k.K)(r=>(0,l.of)(Q({error:r}))))))),this.addTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(y),(0,K.z)(r=>this.service.create(r.task).pipe((0,T.U)(a=>b({task:a})),(0,k.K)(a=>(0,l.of)(X({error:a}))))))),this.updateTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(h),(0,K.z)(r=>this.service.update(r.task).pipe((0,T.U)(a=>h({task:a})),(0,k.K)(a=>(0,l.of)(V({error:a}))))))),this.deleteTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(P),(0,K.z)(r=>this.service.delete(r.task).pipe((0,T.U)(a=>F({task:a})),(0,k.K)(a=>(0,l.of)(q({error:a})))))))}}return t.\u0275fac=function(s){return new(s||t)(c.LFG(i.eX),c.LFG(O))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac}),t})();const $="tasks";var et=S(48070),U=S(80402);const nt=(0,e.ZF)($),ot=(0,e.P1)(nt,t=>t.tasks),B="subtasks",at=(0,e.ZF)(B),rt=(0,e.P1)(at,t=>t.subtasks),L=(0,e.PH)("[tasks] FETCH_SUBTASKS",(0,e.Ky)()),j=(0,e.PH)("[tasks] FETCH_SUBTASKS_SUCCESS",(0,e.Ky)()),ct=(0,e.PH)("[tasks] FETCH_SUBTASKS_ERROR",(0,e.Ky)()),G=(0,e.PH)("[tasks] ADD_SUBTASK",(0,e.Ky)()),M=(0,e.PH)("[tasks] ADD_SUBTASK_SUCCESS",(0,e.Ky)()),it=(0,e.PH)("[tasks] ADD_SUBTASK_ERROR",(0,e.Ky)()),_=(0,e.PH)("[tasks] UPDATE_SUBTASK",(0,e.Ky)()),w=(0,e.PH)("[tasks] UPDATE_SUBTASK_SUCCESS",(0,e.Ky)()),St=(0,e.PH)("[tasks] UPDATE_SUBTASK_ERROR",(0,e.Ky)()),I=(0,e.PH)("[tasks] DELETE_SUBTASK",(0,e.Ky)()),N=(0,e.PH)("[tasks] DELETE_SUBTASK_SUCCESS",(0,e.Ky)()),ut=(0,e.PH)("[tasks] DELETE_SUBTASK_ERROR",(0,e.Ky)());let z=(()=>{class t{constructor(s){this.store=s}helloWorld(){return"Hello from standard ngrx application"}title(){return(0,l.of)("TASKS (standard ngrx application)")}get isProcessingSubtaskRequestSelector(){return(0,l.of)(!1)}get isProcessingTaskRequestSelector(){return(0,l.of)(!1)}allTasksSelector(){return this.store.select(ot)}allSubtasks(s){return this.store.select(rt)}synchonizationSateSelector(){return(0,l.of)("idle")}initAction(){var s=this;return(0,U.Z)(function*(){s.store.dispatch(m())})()}addTaskAction(s,n){var r=this;return(0,U.Z)(function*(){"Enter"===s.code&&(n.newTaskModel&&r.store.dispatch(y({task:{name:n.newTaskModel}})),n.newTaskModel="")})()}removeTaskAction(s){this.store.dispatch(P({task:{id:s}}))}onSaveTaskAction(s,n){n=u.cloneDeep(n),u.merge(n,s),this.store.dispatch(h({task:n}))}fetchSubtaskAction(s){var n=this;return(0,U.Z)(function*(){n.store.dispatch(L({taskId:s}))})()}addSubTaskAction(s,n){if(s.stopImmediatePropagation(),s.stopPropagation(),"Enter"===s.code&&n.tempSubtask){const r=p.Mp.from({name:n.tempSubtask,taskId:n.taskId}),a=u.cloneDeep(r);a&&Object.keys(a).length>0&&this.store.dispatch(G({subtask:a})),n.tempSubtask=""}}removeSubTaskAction(s){this.store.dispatch(I({subtask:s}))}onSaveSubTaskAction(s,n){this.store.dispatch(_({subtask:u.merge(u.clone(n),s)}))}toogleSubtasksAction(s,n,r){r.toogled=n,setTimeout(()=>{var a,C;n.selected?null===(C=r.drawer)||void 0===C||C.close():null===(a=r.drawer)||void 0===a||a.open(),this.store.dispatch(v({task:n})),s.stopPropagation()})}}return t.\u0275fac=function(s){return new(s||t)(c.LFG(e.yh))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac}),t})();const pt=(0,e.Lq)({subtasks:[]},(0,e.on)(j,(t,{subtasks:o})=>Object.assign(Object.assign({},t),{subtasks:u.cloneDeep(o)})),(0,e.on)(M,(t,{subtask:o})=>{const s=u.cloneDeep(t);return s.subtasks.push(o),Object.assign(Object.assign({},t),s)}),(0,e.on)(w,(t,{subtask:o})=>{const s=u.cloneDeep(t);return s.subtasks=s.subtasks.map(n=>n.id===o.id?u.merge(n,o):n),Object.assign(Object.assign({},t),s)}),(0,e.on)(N,(t,{subtask:o})=>{const s=u.cloneDeep(t);return s.subtasks=s.subtasks.filter(n=>n.id!==o.id),Object.assign(Object.assign({},t),s)})),f="subtasks";let W=(()=>{class t{constructor(s){this.httpClient=s}getAll(s){return this.httpClient.get(`${p.ho}/${f}/models?taskId=${s}`)}create(s){return this.httpClient.post(`${p.ho}/${f}/model`,s)}update(s){return this.httpClient.put(`${p.ho}/${f}/model/${s.id}`,s)}delete(s){return this.httpClient.delete(`${p.ho}/${f}/model/${s.id}`)}}return t.\u0275fac=function(s){return new(s||t)(c.LFG(E.eN))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac}),t})(),Tt=(()=>{class t{constructor(s,n){this.actions$=s,this.service=n,this.fetchSubTasks=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(L),(0,d.w)(r=>this.service.getAll(r.taskId).pipe((0,T.U)(a=>j({subtasks:a})),(0,k.K)(a=>(0,l.of)(ct({error:a}))))))),this.addSubTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(G),(0,d.w)(r=>this.service.create(r.subtask).pipe((0,T.U)(a=>M({subtask:a})),(0,k.K)(a=>(0,l.of)(it({error:a}))))))),this.updateSubTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(_),(0,d.w)(r=>this.service.update(r.subtask).pipe((0,T.U)(a=>w({subtask:a})),(0,k.K)(a=>(0,l.of)(St({error:a}))))))),this.deleteSubTask=(0,i.GW)(()=>this.actions$.pipe((0,i.l4)(I),(0,d.w)(r=>this.service.delete(r.subtask).pipe((0,T.U)(a=>N({subtask:a})),(0,k.K)(a=>(0,l.of)(ut({error:a})))))))}}return t.\u0275fac=function(s){return new(s||t)(c.LFG(i.eX),c.LFG(W))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac}),t})(),kt=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({providers:[W],imports:[[E.JF,e.Aw.forFeature(B,pt),i.sQ.forFeature([Tt])]]}),t})();S(46389);let dt=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({providers:[H,O,z],imports:[[et.TasksEngineModule.forRoot({customEngineService:z}),E.JF,e.Aw.forFeature($,st),i.sQ.forFeature([H]),kt]]}),t})();var Et=S(98087),ht=S(239),At=S(59701);const Kt=(0,e.Lq)({loggedUser:""}),Ut=[{path:"",component:Y}];let Ct=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[Z.ez,dt,e.Aw.forRoot(Kt,{}),i.sQ.forRoot([]),ht.Qi.forRoot(),At.FT.instrument({}),Et.Bz.forChild(Ut)]]}),t})()}}]);