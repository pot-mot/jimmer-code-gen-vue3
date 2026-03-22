import {ListGlobalConfig} from '@potmot/list';
import {interactionClassNames} from '@/utils/event/judgeEventTarget.ts';
import {sendMessage} from '@/components/message/messageApi.ts';
import {translate} from '@/store/i18nStore.ts';

export const listClipBoardConfig = () => {
    ListGlobalConfig.ignoreClassNames = interactionClassNames;
    ListGlobalConfig.copySuccessHandler = () => {
        sendMessage(translate('copy_success_tip'), {type: 'success'});
    };
    ListGlobalConfig.copyFailedHandler = (error) => {
        sendMessage(translate('copy_fail_tip'), {type: 'warning'});
        console.error('copy failed', error);
    };
    ListGlobalConfig.pasteSuccessHandler = () => {
        sendMessage(translate('paste_success_tip'), {type: 'success'});
    };
    ListGlobalConfig.pasteFailedHandler = (error) => {
        sendMessage(translate('paste_fail_tip'), {type: 'warning'});
        console.error('paste failed', error);
    };
};
