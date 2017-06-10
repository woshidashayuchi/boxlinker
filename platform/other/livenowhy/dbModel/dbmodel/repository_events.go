package dbmodel

// 镜像库消息通知
//
//import (
//	"github.com/docker/docker/distribution/notifications"
//	"github.com/jmoiron/sqlx"
//)
//
//func AddNewEvent(db *sqlx.DB, event *notifications.Event) (error){
//	// 新的事件通知, 添加, events 记录
//	const sql = `insert into repository_events
//	(repository, url, lengths, tag, actor, actions, digest, sizes, repo_id, source_instanceID, source_addr, creation_time, update_time)
//	values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
//
//	return InsertExec(db, sql, event.Target.Repository, event.Target.URL,
//		event.Target.Length, event.Target.Tag, event.Actor.Name,
//		event.Action, event.Target.Digest, event.Target.Size, event.ID, event.Source.Addr,
//		event.Timestamp, event.Timestamp)
//
//	// timestamp, action, Target.mediaType --> mediaType, Target.Size --> size, Target.Digest --> digest
//	// Target.Length --> length, Target.Repository --> repository,
//	// Target.FromRepository --> fromRepository, Target.URL --> url, Target.Tag --> tag,
//	// Actor.Name --> actor  SourceRecord.Addr --> addr  SourceRecord.InstanceID --> instanceid
//}
//
//func UpdateEvent(db *sqlx.DB, event *notifications.Event) (error){
//	// events 记录
//	const sql = `update repository_events set actions=?, url=?, lengths=?, actor=?, digest=?, sizes=?,
//               source_instanceID=?, source_addr=?, update_time=? where repository=? and tag=?`
//
//	_, err := db.Exec(sql, event.Action, event.Target.URL, event.Target.Length, event.Actor.Name, event.Target.Digest,
//		event.Target.Size, event.Source.InstanceID, event.Source.Addr, event.Timestamp, event.Target.Repository, event.Target.Tag)
//
//	return err
//}
//
//
//
//
//  //def get_image_repo_events(self, repository, tag):
//  //      """ 通过镜像名和标签验证是否已经上传"""
//  //      sql = "select count(*) from repository_events where repository='%s' and tag='%s'" % (repository, tag)
//  //      return super(ImageRepoDB, self).exec_select_sql(sql)[0][0]
//  //
//
//
//	//
//    //def get_repo_events_by_imagename(self, imagerep_name):
//    //    """获取一个镜像的全部 RepositoryEvents 信息"""
//    //    sql = "select id, repository, url, lengths, tag, actor, actions, digest, sizes, repo_id, \
//    //           source_instanceID, source_addr, deleted, creation_time, update_time \
//    //           from repository_events where repository='%s'" % (imagerep_name)
//    //    return super(ImageRepoDB, self).exec_select_sql(sql)
