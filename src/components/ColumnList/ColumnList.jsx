import ColumnItem from '../ColumnItem/ColumnItem';
import css from './styles.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleBoard } from '../../redux/boards/operationsBoards';
import { selectedBoard } from '../../redux/boards/selectors';
import AddColumnModal from '../AddColumnModal/AddColumModal';
import Modal from '../Modal/Modal';
import AddColumnButton from '../AddColumnButton/AddColumnButton';
import OpenFiltersButton from '../OpenFiltersBtn/OpenFiltersBtn';
import FilterModal from '../FilterModal/FilterModal';
import { selectFilter, selectedBoard } from '../../redux/boards/selectors';
import { setFilter } from '../../redux/boards/filterSlice';

const ColumnsList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const board = useSelector(selectedBoard);
  const filter = useSelector(selectFilter)
  const params = useParams();
  const dispatch = useDispatch();
  const { title, columns, background } = board;
  const bgNumber = background || '1';
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const toggleAddColumn = () => {

    setIsAddColumnOpen(!isAddColumnOpen)
  }
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  
    setIsAddColumnOpen(!isAddColumnOpen)
  }

  useEffect(() => {
    dispatch(fetchSingleBoard(params.boardId));
  }, [dispatch, params.boardId]);

  const filteredColumns = columns.map(column => ({
    ...column,
    cards: column.cards.filter(card => {
      if (filter === 'all') return card;
      return card.label === filter;
    })
  }));

  const isRetina = () => {
    if (window.devicePixelRatio > 1) {
      return '@2x';
    } else {
      return '';
    }
  };

  const setDevice = () => {
    if (window.innerWidth <= 375) {
      return 'moblie';
    }
    if (window.innerWidth <= 768) {
      return 'tablet';
    }
    return 'desktop';
  };

  const device = setDevice();
  const ratio = isRetina();
  const bgurl = require(`../../assets/backgrounds/allBg/${device}_background_${
    bgNumber + ratio
  }.jpg`);

  return (
    <div
      className={css.task_list_container}
      style={{ backgroundImage: `url(${bgurl})` }}
    >
      <div className={css.headerWrapper}>
        <h4 className={css.board_title}>{title}</h4>
        <OpenFiltersButton click={toggleFilter}/>
      </div>
      {board.columns && board.columns[0]._id ? (
        <>
          <ul className={css.column_list}>
            {filteredColumns.map(el => {
              return <ColumnItem key={el._id} column={el} />;
            })}
            <li>
              <AddColumnButton click={toggleAddColumn} />
            </li>
          </ul>
        </>
      ) : (
        <AddColumnButton click={toggleAddColumn}/>
      )}
      {isAddColumnOpen && (
        <Modal onClose={toggleAddColumn}>
          <AddColumnModal onClose={toggleAddColumn} />
        </Modal>
      )}
      {isFilterOpen && <Modal onClose={toggleFilter}><FilterModal onClose={ toggleFilter} /></Modal>}
    </div>
  );
};

export default ColumnsList;
