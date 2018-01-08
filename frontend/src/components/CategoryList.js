import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class CategoryList extends Component{

  render(){
    const {changeCategory,categories} = this.props;

    return (
      <div className="post-category-list">
        <div className="category-list-item"><NavLink activeClassName="category-list-item-active" onClick={() => changeCategory()} exact to="/">All</NavLink> | </div>  
      
        {categories.map((category) =>
          <div key={category.path} className="category-list-item">
            <NavLink activeClassName="category-list-item-active" onClick={() => changeCategory(category.path)} exact to={"/" + category.path}>{category.name}</NavLink> | 
          </div>  
        )}
      </div>
    );
  }
};

export default CategoryList;