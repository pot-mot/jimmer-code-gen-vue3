<template>
	<div class="part">
		<h1>
			JIMMER CODE GEN
		</h1>
	</div>

	<div class="part">
		<ul class="main">
			<li>
				<RouterLink to="/models">
					// TODO
					<h2><el-text size="large">模型设计</el-text></h2>

					<div class="body">
						<el-text size="default">
							从头开始设计你的数据库模型和关联关系
						</el-text>

						<ul>
							<li>
								<el-text size="default" type="success">
									支持 ManyToMany 与 OneToMany
								</el-text>
							</li>
							<li>
								<el-text size="default" type="success">
									不依赖数据源，且可以导入不同种类数据源
								</el-text>
							</li>
							<li>
								<el-text size="default" type="warning">
									关联仅于表模型间创建
								</el-text>
							</li>
						</ul>
					</div>
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/graph">
					<h2><el-text size="large">关联编辑</el-text></h2>

					<div class="body">
						<el-text size="default">
							基于已有的数据库结构快速生成关联模型与实体
						</el-text>

						<ul>
							<li>
								<el-text size="default" type="warning">
									不支持 ManyToMany 与 OneToMany
								</el-text>
							</li>
							<li>
								<el-text size="default" type="warning">
									依赖数据源
								</el-text>
							</li>
							<li>
								<el-text size="default" type="warning">
									关联于列间创建，导入时保留所有外键
								</el-text>
							</li>
						</ul>
					</div>
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/entity">
					// TODO
					<h2><el-text size="large">实体管理</el-text></h2>

					<div class="body">
						<el-text size="default">
							管理生成的实体与枚举
						</el-text>

						<ul>
							<el-text size="default" type="success">
								连带包管理与批量生成 // TODO
							</el-text>
						</ul>
					</div>
				</RouterLink>
			</li>
		</ul>
	</div>

	<div class="part">
		<h2>依赖技术栈</h2>
		<ul class="dependence">
			<li>
				<a href="https://github.com/babyfish-ct/jimmer" target=“_blank”>Jimmer</a>
				<a href="https://kotlinlang.org" target=“_blank”>Kotlin</a>
			</li>
			<li>
				<a href="https://github.com/antvis/X6" target=“_blank”>AntV/X6</a>
				<a href="https://cn.vitejs.dev" target=“_blank”>Vite</a>
				<a href="https://vue3js.cn" target=“_blank”>Vue3</a>
			</li>
		</ul>
	</div>

	<div class="part">
		<h2>相关链接</h2>
		<ul class="link">
			<li>
				<label>维护者</label>
				<a href="https://gitee.com/run-around---whats-wrong">乱跑-了</a>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.part {
	line-height: 1.7em;

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
	grid-gap: 2em;
	margin-bottom: 10px;

	> li {
		height: 250px;
		padding: 10px 0;
		text-align: center;
		box-shadow: var(--el-box-shadow);

		&:hover {
			box-shadow: var(--el-box-shadow-dark);
		}
	}
}

.dependence {
	li {
		height: 50px;
		line-height: 50px;

		> label,
		> a {
			padding: 1em;
		}
	}
}

.link {
	li {
		height: 40px;
		line-height: 40px;

		> a {
			padding: 1em;
		}
	}
}
</style>

<script setup lang="ts">
</script>