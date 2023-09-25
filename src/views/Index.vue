<template>
	<div class="part">
		<h1>
			JIMMER CODE GEN
		</h1>
	</div>

	<div class="part">
		<ul class="main">
			<RouterLink to="/graph">
				<li>
					关联编辑
				</li>
			</RouterLink>
			<RouterLink to="/entity">
				<li>
					实体生成
				</li>
			</RouterLink>
			<RouterLink to="/data">
				<li>
					数据管理
				</li>
			</RouterLink>
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
	h1 {
		height: 120px;
		line-height: 120px;
		text-align: center;
	}

	h2 {
		height: 45px;
		line-height: 45px;
	}
}

.main {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 2em;

	li {
		height: 250px;
		text-align: center;
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