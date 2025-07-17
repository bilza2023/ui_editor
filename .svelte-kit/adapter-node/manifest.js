export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/8.1-q2-p-1.png","images/8.1-q2-p-2.png","images/activity1.jpg","images/al-khwarizmi_book_page.webp","images/algebra_area_formula.png","images/antilog1.jpg","images/antilog2.jpg","images/antilog3.jpg","images/antilog4.jpg","images/appleFallingFromTree.webp","images/atom.png","images/baloons.png","images/banner_brand.png","images/banners.png","images/bg.png","images/black_board.jpg","images/board_classroom.jpg","images/box.webp","images/branches_of_physics.webp","images/canvas.jpeg","images/car showing speed (1).png","images/car showing speed.png","images/carbon-atom.png","images/class.webp","images/class2.webp","images/defaultBg.png","images/drops.png","images/edit.jpeg","images/equation_balance_scale_labeled.webp","images/everyDayItems.webp","images/ex4.1-q2_matrix_multiplication.png","images/exp.jpeg","images/expression_example_labeled.webp","images/fbise9physicsChapter1Bg.webp","images/fbise9physicsChapter1Thumbnail.webp","images/fbise9physicsChapter3Thumbnail.webp","images/fbise9physicsChapter4Thumbnail.webp","images/fbise9physicsChapter5Thumbnail.webp","images/fbise9physicsChapter6Thumbnail.webp","images/fbise9physicsChapter7Thumbnail.webp","images/fbise9physicsChapter8Thumbnail.webp","images/fbise9physicsChapter9Thumbnail.webp","images/female.png","images/female_teacher.jpg","images/graph.png","images/helium-atom.png","images/hydrongen-atom.png","images/logtable1.jpg","images/logtable2.jpg","images/logtable3.jpg","images/logtable4.jpg","images/mad_scientist.jpg","images/magic.jpeg","images/male.png","images/matric_column_n_row.png","images/matrix_multiplication_01.png","images/matrix_multiplication_02.png","images/matrix_multiplication_03.png","images/matrix_multiplication_04.png","images/matrix_multiplication_05.png","images/moving car with arrows.jpg","images/oxygen-atom.png","images/pattern_waves.png","images/people.png","images/physicsArt.webp","images/physicsBranches.webp","images/physicsClass.webp","images/physics_bg.webp","images/physics_in_life.webp","images/physics_modern_life.webp","images/player.jpeg","images/potrate.jpg","images/presentation.jpeg","images/pythagoras_diagram.webp","images/rocketTakeoff.webp","images/solarsystem.jpg","images/student_solving_equation_blackboard.webp","images/taleem.webp","images/taleem_classroom.jpg","images/taleemclass.webp","images/teacher_facing_board.jpg","images/teen_boy.jpg","images/theorem10.1.1.png","images/typesOfForce.webp","images/whatisforce.webp","images/wood.jpg","sounds/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.opus","sounds/music.opus","sounds/test__test_chapter__test_ex__test_question.opus","sounds/test__test_chapter__test_ex__test_question2.opus"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp",".jpeg":"image/jpeg",".opus":"audio/ogg"},
	_: {
		client: {"start":"_app/immutable/entry/start.BDrqkFiy.js","app":"_app/immutable/entry/app.mo2vWJLM.js","imports":["_app/immutable/entry/start.BDrqkFiy.js","_app/immutable/chunks/entry.BM7-Tzt4.js","_app/immutable/chunks/scheduler.B4ym6uSw.js","_app/immutable/chunks/index.DEtmVEFf.js","_app/immutable/entry/app.mo2vWJLM.js","_app/immutable/chunks/scheduler.B4ym6uSw.js","_app/immutable/chunks/index.firPCsyK.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";