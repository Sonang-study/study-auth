import { useSetRecoilState } from 'recoil';
import { toDosState } from './atom';

function ToDos() {
  const [toDos, setToDos] = useSetRecoilState(toDosState);


}

ToDos.prototype.getToDos=()=>{
    return toDos
}
