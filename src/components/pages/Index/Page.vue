<template>
	<div class="container">
		<div class="part">
			<h1>
				JIMMER CODE GEN
			</h1>

			<ul class="main">
				<li>
					<RouterLink to="/models">
						<div class="container">
							<h2>
								<el-text size="large">模型设计</el-text>
							</h2>

							<div class="body">
								<el-text size="default">
									设计数据库模型和逻辑或物理关联
								</el-text>

								<ul>
									<li>
										<el-text size="default" type="success">
											不依赖数据源，但也可以导入数据源中的表结构
										</el-text>
									</li>
								</ul>
							</div>
						</div>
					</RouterLink>
				</li>
			</ul>
		</div>

		<div class="part">
			<h2>依赖技术栈</h2>
			<ul class="dependence" v-for="dependences in [backendDependences, frontendDependences]">
				<li v-for="dependence in dependences">
					<a target="_blank" :href="dependence.link">
						<div v-if="dependence.icon && dependence.icon.startsWith('<svg')" class="icon" v-html="dependence.icon"></div>
						<img v-else-if="dependence.icon" :src="dependence.icon" class="icon" :alt="dependence.icon">
						{{ dependence.label }}
					</a>
				</li>
			</ul>

		</div>

		<div class="part">
			<h2>相关链接</h2>
			<ul class="related-link">
				<li v-for="relatedLink in relatedLinks">
					<label>{{ relatedLink.label }}</label>
					<a v-for="link in relatedLink.links" target="_blank" :href="link.value">
						<div v-if="link.icon && link.icon.startsWith('<svg')" class="icon" v-html="link.icon"></div>
						<img v-else-if="link.icon" :src="link.icon" class="icon" :alt="link.icon">
						<span v-else-if="link.describe">{{ link.describe }}</span>
						<span v-else>{{ link.value }}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	padding: 0 20px;
}

.icon {
	display: inline-block;
	width: 1.3em;
	height: 1.3em;
	vertical-align: -15%;
}

.part {
	padding-bottom: 20px;

	h1 {
		height: 120px;
		line-height: 120px;
		text-align: center;
		color: var(--el-text-color);
	}

	h2 {
		height: 45px;
		line-height: 45px;
		color: var(--el-text-color);
	}
}

.main {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	margin-bottom: 10px;

	> li {
		height: 250px;
		padding: 10px 0;
		line-height: 30px;
		text-align: center;
		box-shadow: var(--el-box-shadow);

		&:hover {
			box-shadow: var(--el-box-shadow-dark);
		}

		.container {
			height: 100%;
			padding: 20px;
		}
	}
}

.dependence {
	display: flex;
	font-size: 1rem;

	> li {
		height: 50px;
		line-height: 50px;

		> a {
			padding-left: 30px;
		}
	}
}

.related-link {
	font-size: 0.9rem;

	> li {
		height: 35px;
		line-height: 35px;

		> label {
			padding-left: 30px;
		}

		> a {
			padding-left: 20px;
		}
	}
}
</style>

<script lang="ts" setup>
const icons: { [key: string]: string } = {
	// https://www.iconfont.cn/search/index?searchType=icon&q=github
	github: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z\"></path></svg>",
	// https://www.iconfont.cn/search/index?searchType=icon&q=gitee&page=1&fromCollection=1
	gitee: "<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z\" fill=\"#C71D23\"></path></svg>",

	kotlin: "",
	vue: "",
	jimmer: "",
	vite: "",
	antV: "",

}

interface DependenceLabel {
	icon: string,
	link: string,
	label: string,
	describe?: string,
}

const backendDependences: DependenceLabel[] = [
	{
		icon: icons.kotlin,
		link: "https://kotlinlang.org",
		label: "Kotlin",
		describe: "开发语言",
	},
	{
		icon: icons.jimmer,
		link: "https://github.com/babyfish-ct/jimmer",
		label: "Jimmer",
		describe: "ORM",
	},
]

const frontendDependences: DependenceLabel[] = [
	{
		icon: icons.vue,
		link: "https://vue3js.cn",
		label: "Vue3",
		describe: "开发框架",
	},
	{
		icon: icons.antV,
		link: "https://github.com/antvis/X6",
		label: "AntV/X6",
		describe: "图编辑",
	},
	{
		icon: icons.vite,
		link: "https://cn.vitejs.dev",
		label: "Vite",
		describe: "构建工具",
	},
]

interface RelatedLink {
	links: {
		icon?: string,
		value: string,
		describe?: string,
	}[],
	label: string,
}

const relatedLinks: RelatedLink[] = [
	{
		links: [
			{
				icon: icons.github,
				value: "https://github.com/pot-mot",
			},
			{
				icon: icons.gitee,
				value: "https://gitee.com/run-around---whats-wrong",
			}
		],
		label: "开发者",
	},
	{
		links: [
			{
				icon: icons.github,
				value: "https://github.com/pot-mot/jimmer-code-gen-vue3",
			},
			{
				icon: icons.gitee,
				value: "https://gitee.com/run-around---whats-wrong/jimmer-code-gen-vue3",
			}
		],
		label: "项目仓库（前端）",
	},
	{
		links: [
			{
				icon: icons.github,
				value: "https://github.com/pot-mot/jimmer-code-gen-kotlin",
			},
			{
				icon: icons.gitee,
				value: "https://gitee.com/run-around---whats-wrong/jimmer-code-gen-kotlin",
			}
		],
		label: "项目仓库（后端）",
	},
]
</script>
