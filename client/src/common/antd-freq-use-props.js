import smartSearch from './smart-search'


export const enableSelectSearch = {
  showSearch: true,
  optionFilterProp: 'children',
  notFoundContent: '没有内容',
  filterOption: (input, option) => {
    return smartSearch(input, option.props.children)
  }
}

