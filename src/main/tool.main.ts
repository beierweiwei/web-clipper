import { PopupContentScriptIPCClient } from './../service/ipc/browser/popup/ipcClient';
import 'regenerator-runtime/runtime';
import 'reflect-metadata';
import Container from 'typedi';
import { IPermissionsService } from '@/service/common/permissions';
import { PermissionsChannelClient } from '@/service/permissions/common/permissionsIpc';
import { IContentScriptService } from '@/service/common/contentScript';
import { ContentScriptChannelClient } from '@/service/contentScript/common/contentScriptIPC';
import { ITabService } from '@/service/common/tab';
import { PopupIpcClient } from '@/service/ipc/browser/popup/ipcClient';
import '@/service/config/browser/configService';
import '@/service/powerpackService';
import '@/service/trackService';
import { TabChannelClient } from '@/service/tab/common/tabIpc';
import app from '@/pages/app';

const ipcClient = new PopupIpcClient();

const tabChanel = ipcClient.getChannel('tab');
Container.set(ITabService, new TabChannelClient(tabChanel));

const permissionsChannel = ipcClient.getChannel('permissions');
Container.set(IPermissionsService, new PermissionsChannelClient(permissionsChannel));

const contentScriptIPCClient = new PopupContentScriptIPCClient(Container.get(ITabService));
const contentScriptChannel = contentScriptIPCClient.getChannel('contentScript');
Container.set(IContentScriptService, new ContentScriptChannelClient(contentScriptChannel));

app();
