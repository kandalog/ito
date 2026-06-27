@AGENTS.md

## 概要

このプロジェクトは、ボードゲーム「Ito」と互換性のあるゲームをWeb上で遊べるようにしたアプリケーションです。

## 技術スタック

- Next.js App Router
- Hono
- Prisma / MySQL

## フロントエンド

```shell
frontend/
	app/ # Next.jsの特殊ファイルとrouting関連だけを配置。薄くする
		users/
			- page.tsx
	lib/
		- hoge.ts
		base/
			- BaseRepository.ts
			- BaseUseCase.ts
	features/ # 機能ごとに分ける
		users/
			hooks/
			components/
			- types.ts # 各featureでtypeを管理する
```

## バックエンド

```shell
backend/
	src/
	  - index.ts # Hono app本体。routeの集約
	  routes/ # routing
	    - users.route.ts
	    - rooms.route.ts
	  controller/ # # c.req / c.json を触る層
	    - users.controller.ts
	    - rooms.controller.ts
	  services/ # # 業務ロジック
	    - user.service.ts
	    - room.service.ts
	  repositories/ # DBアクセス
	    - user.repository.ts
	    - room.repository.ts
	  lib/ # 外部ライブラリ初期化や汎用系
	    - prisma.ts
	  middlewares/
	    - error.middleware.ts
	  types/ # 型情報
	    - hono.ts
	  schemas/
			- user.schema.ts
			- room.schema.ts
	prisma/ # DB schema
	  - schema.prisma
	  - migrations/
```
