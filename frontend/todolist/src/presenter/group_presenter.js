export default class GroupPresenter {
  constructor(groupService, groupId = '1') {
    this.groupId = groupId;
    this.groupService = groupService;
    this.group = ['a'];
  }
  getGroups = async () => {
    return ['one', 'two', 'three'];
  };

  getMyGroup = async () => {
    return await this.groupService.myGroup();
  };

  getGroupMembers = async (id) => {
    return await this.groupService.getGroupMembers(id);
  };
}
