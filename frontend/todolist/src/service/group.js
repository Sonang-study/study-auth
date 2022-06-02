export default class GroupService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }
  async addGroup(groupName) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: groupName,
      }),
    });
    return data;
  }

  async inviteGroup(groupId, userId) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        groupId,
        userId,
      }),
    });
    return data;
  }

  async myGroup() {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/my`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async memberGroup(groupId) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/${groupId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async modifyGroup(groupId, name) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/${groupId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
      }),
    });
    return data;
  }

  async deleteGroup(groupId) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/${groupId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  async getGroupMembers(groupId) {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/group/${groupId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }

  async getUsers() {
    const token = this.tokenStorage.getToken();
    const data = await this.http.fetch(`/users`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}
