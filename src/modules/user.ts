import request from '@/core/request';
import { EHDUserModule } from '@/types/modules/user';
import { USER } from '@/utils/constants';

const user: EHDUserModule = {
  user: () => {
    return request(`${USER}`, {}, []);
  },
};

export default user;
