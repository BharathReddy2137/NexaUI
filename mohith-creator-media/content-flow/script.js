
.cf-heading{display:flex;justify-content:space-between;align-items:center;gap:20px;margin:8px 0 22px}
.cf-heading h1{font-size:clamp(28px,3.6vw,43px);letter-spacing:-.04em;margin:10px 0}
.cf-heading p{margin:0}
.cf-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}
.cf-lower{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}
.text-action{background:none;border:0;color:var(--accent2);font:inherit;cursor:pointer}
.workflow{padding:8px 20px}
.workflow-step{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line)}
.workflow-step:last-child{border:0}
.workflow-step>div{display:grid;gap:4px;flex:1}
.workflow-step small,.schedule-row small{color:var(--muted);font-size:11px}
.workflow-step strong{font-size:13px}
.step-dot{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px color-mix(in srgb,var(--accent) 45%,transparent)}
.next-actions{display:grid;gap:8px}
.next-actions button{display:flex;justify-content:space-between;align-items:center;text-align:left;padding:15px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.025);color:var(--text);cursor:pointer}
.next-actions button b{color:var(--accent2)}
.calendar-card{padding:18px}
.calendar-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}
.day-cell{min-height:135px;padding:10px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.02)}
.day-cell strong{font-size:12px}
.day-cell small{display:block;color:var(--muted);margin-top:3px}
.calendar-event{display:block;margin-top:10px;padding:7px;border-radius:8px;background:color-mix(in srgb,var(--accent) 14%,transparent);font-size:10px;line-height:1.4}
.calendar-event.alt{background:color-mix(in srgb,var(--accent2) 14%,transparent)}
.schedule-list{display:grid;gap:0}
.schedule-row{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line)}
.schedule-row:last-child{border:0}
.schedule-row>div{display:grid;gap:4px;flex:1}
.channel-dot{width:9px;height:9px;border-radius:50%;background:var(--accent)}
.channel-dot.youtube{background:var(--mint)}.channel-dot.email{background:var(--accent2)}
.kanban{display:grid;grid-template-columns:repeat(4,minmax(210px,1fr));gap:12px;overflow-x:auto;padding-bottom:8px}
.kanban-column{padding:12px;border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.02);min-height:320px}
.kanban-head{display:flex;justify-content:space-between;align-items:center;padding:4px 2px 13px}
.kanban-head span{color:var(--muted);font-size:12px}
.task-card{padding:14px;margin-bottom:10px;border:1px solid var(--line);border-radius:13px;background:rgba(13,20,36,.82)}
.task-card h3{font-size:13px;margin:12px 0 6px}
.task-card p{font-size:11px;color:var(--muted);line-height:1.5;margin:0 0 12px}
.task-card small{font-size:10px;color:var(--muted)}
.move-task{display:block;width:100%;margin-top:12px;padding:8px;border:1px solid var(--line);border-radius:9px;background:rgba(255,255,255,.04);color:var(--text);font-size:11px;cursor:pointer}
.library-tools{display:flex;gap:10px;margin:14px 0}
.library-tools input,.library-tools select,.box select{padding:11px 12px;border:1px solid var(--line);border-radius:10px;background:#080d18;color:var(--text)}
.library-tools input{flex:1}
.library-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}
.library-item h3{margin:12px 0 7px}
.library-item p{margin:0 0 13px}
.approval-list{display:grid;gap:0}
.approval-row{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;border-bottom:1px solid var(--line)}
.approval-row:last-child{border:0}
.approval-row h3{font-size:14px;margin:10px 0 5px}
.approval-row p{font-size:11px;margin:0}
.approval-actions{display:flex;gap:8px;flex-shrink:0}
.settings-list{display:grid;gap:8px}
.box label{display:block;color:var(--muted);font-size:12px;margin:10px 0 5px}
.box select{width:100%;margin:0 0 8px}
.box input{display:block}
@media(max-width:1050px){.cf-stats{grid-template-columns:repeat(2,1fr)}.cf-lower{grid-template-columns:1fr}.kanban{grid-template-columns:repeat(4,230px)}}
@media(max-width:740px){.cf-heading{align-items:flex-start;flex-direction:column}.cf-heading>.primary{width:100%}.cf-stats{grid-template-columns:1fr 1fr}.calendar-grid{gap:4px}.day-cell{min-height:105px;padding:6px}.calendar-event{font-size:9px;padding:5px}.library-grid{grid-template-columns:1fr}.library-tools{flex-direction:column}.approval-row{align-items:flex-start;flex-direction:column}.approval-actions{width:100%}.approval-actions button{flex:1}}
@media(max-width:430px){.cf-stats{grid-template-columns:1fr 1fr}.calendar-grid{grid-template-columns:repeat(7,minmax(42px,1fr));overflow-x:auto}.calendar-card{overflow-x:auto}}
