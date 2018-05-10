# attendance

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


2、后端接口
	2.1 创建签到点
		POST /location
		参数body
			{place,latitude,longitude,radius}
		Header token
		返回body
			{id,place,latitude,longitude,radius,creatorId,created,status}
		
	2.2 修改签到点
		PUT /location/{id}
		参数body
			{place,latitude,longitude,radius}
		Header token
		返回body
			{id,place,latitude,longitude,radius,creatorId,created,status}
	2.3 删除签到点
		DELETE /location/{id}
		Header token
		返回body
			null
	
	2.4	创建组织签到的规则
		POST /rule
		参数body
			{oId,locationId,signIn,signOut}
		Header token
		返回body
			{id,oId,oName,locationId,signIn,signOut,workDay,creatorId,creator,created,status}
	2.5 修改规则
		PUT /rule/{id}
		参数body
			{oId,locationId,signIn,signOut}
		Header token
		返回body
			{id,oId,oName,locationId,signIn,signOut,workDay,creatorId,creator,created,status}
	2.6	删除规则
		DELETE /rule/{id}
		Header token
		返回body
			null
	2.7 获取签到规则
		GET /rule
		Header token
		返回body
			[{locationId,place,radius,ruleId,oId,signIn,signOut,oId,oName,status}]
	2.8 获取签到规则
		GET /rule/{id}
		Header token
		返回body
			{locationId,place,radius,ruleId,oId,signIn,signOut,oId,oName}
	2.9 获取签到统计数据
		GET /record/org/{oId}/location/{locationId}
		参数值
			?begin&end&limit&offset
		返回body
			[{id,eId,place,time,eName,oName}]
	2.10 获取外出签到统计数据
		GET /record/org/{oId}/location/out
		参数值
			?begin&end&limit&offset
		返回body
			[{id,eId,place,time, eName,oName}]
	
	2.11 获取组织的签到数据 /record/org/{oId}
		参数值
			?begin&end&limit&offset
		返回body
			[{id,eId,place,time, eName,oName}]
			
	2.12 导出组织的签到数据
		GET /record/org/{oId}/download
		参数值
			?begin&end&locationId&shift
		返回excel
		

        :
http://183.196.130.125:9001/attendance/
:
打卡接口地址

通讯录地址： http://183.196.130.125:9002/contact
返回值
JSON org:
	{
		"oId": "组织编号",
		"oName": "组织名称",
		"pId":"上级组织编号",
		"weight":权重,
		"valid":状态[0|1],
		"orgType":组织类型[1|2|3],
		"count":组织下所有员工数,
		"createDate":创建时间,
		"lastUpdateDate":更新时间
	} 
	
GET /org  过滤组织
		?leafoId 查询该组织的上级组织
		?pId		  查询该组织的下级组织
返回数据:[
			{org}
			]





















			----------------------------------------------------------------------
			1、前端接口
	1.1 获取用户签到点
		GET /location
		参数param
			?ticket&latitude&longitude
		Header ticket
		返回body
			{oId, place, signIn,signOut,id ,distance}
	1.2 创建签到记录
		注释：place:外出签到是地点，正常签到是签到点
		POST /record
		参数body
			{place,result,note,shift,latitude,longitude,photo}
		Header ticket
		返回body
			{id,place,time,result,note,shift,latitude,longitude,photo}
	1.3 修改签到记录
		PUT	/record/{id}
		参数body
			{note,photo}
		Header ticket
		返回body
			{id,place,time,result,note,shift,latitude,longitude,photo}
	1.4 按天获取签到记录结果
		GET /record
		参数param
			?ticket&time
		Header ticket
		返回body
			{place,time,result,shift,id}
	1.5 获取签到记录详情
		GET /record/{id}
		Header ticket
		返回body
			{place,time,result,shift,id,latitude,longitude,note,photo,eId}
	1.5 获取签到记录结果
		GET /record/stats
		Header ticket
		参数param
			?begin&end
		返回body
			{date,result}
	
            +


